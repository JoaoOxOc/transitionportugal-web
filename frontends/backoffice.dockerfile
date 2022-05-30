FROM node:16 as base
WORKDIR /app/
ENV PATH /app/node_modules/.bin:$PATH
#COPY ./package.json ./
#COPY ./lerna.json ./

COPY ./package.json /app/
COPY ./lerna.json /app/
COPY ./packages/tp_translations/package.json ./app/packages/tp_translations/
COPY ./packages/tp_geolocation/package.json ./app/packages/tp_geolocation/
COPY ./packages/tp_components/package.json ./app/packages/tp_components/
COPY ./packages/tp_backoffice/package.json ./app/packages/tp_backoffice/

RUN npm install --force
RUN ls -l ./app/packages/tp_backoffice
#RUN ls -l ./app/node_modules




# Package @transitionpt/backoffice and it's dependencies
FROM base as transitionpt_backoffice-build
WORKDIR /app/

# tp_translations is a dependency in tp_backoffice, install it's dependencies
#COPY  packages/tp_translations/package.json /app/packages/tp_translations/package.json
COPY  packages/tp_translations/ /app/packages/tp_translations/ 
# tp_components is a dependency in tp_backoffice, install it's dependencies
#COPY  packages/tp_components/package.json /app/packages/tp_components/package.json
COPY  packages/tp_components/ /app/packages/tp_components/ 
# tp_geolocation is a dependency in tp_backoffice, install it's dependencies
#COPY  packages/tp_geolocation/package.json /app/packages/tp_geolocation/package.json
COPY  packages/tp_geolocation/ /app/packages/tp_geolocation/ 

# compile tp_translations and tp_geolocation (typescript packages)
RUN npm config set legacy-peer-deps true

#RUN npx lerna bootstrap --scope=@transitionpt/translations --no-ci --includeDependencies
WORKDIR /app/packages/tp_translations/
RUN npm install --force

#RUN npx lerna bootstrap --scope=@transitionpt/geolocation --no-ci --includeDependencies
WORKDIR /app/packages/tp_geolocation/
RUN npm install --force

RUN npx lerna run tsc --stream

#RUN npx lerna bootstrap --scope=@transitionpt/components --no-ci --includeDependencies
WORKDIR /app/packages/tp_components/
RUN npm install --force

# install tp_backoffice dependencies
COPY  packages/tp_backoffice/package.json /app/packages/tp_backoffice/package.json
COPY  packages/tp_backoffice/ /app/packages/tp_backoffice/ 

#RUN npm config set legacy-peer-deps true
#RUN true
#RUN npx lerna bootstrap --scope=@transitionpt/backoffice --no-ci --includeDependencies
WORKDIR /app/packages/tp_backoffice/
RUN npm install --force
#RUN ls -l /app/packages/tp_backoffice/node_modules
#RUN ls -l /app/packages/tp_backoffice/node_modules/@transitionpt

# WORKAROUND: lerna compiles packages as a symlink in node_modules, which will not work with next start command
#RUN rm -rf /app/packages/tp_backoffice/node_modules/@transitionpt/

#WORKDIR /app/packages/tp_backoffice

#RUN npm install --loglevel verbose
RUN ls -l /app/packages/tp_backoffice/node_modules


# final stage
FROM base as final-transitionpt_backoffice-build-stage

COPY --from=transitionpt_backoffice-build /app/packages/tp_backoffice /app/packages/tp_backoffice
RUN ls -l /app/packages/tp_backoffice
RUN ls -l /app/node_modules
COPY --from=transitionpt_backoffice-build /app/packages/tp_translations /app/packages/tp_translations
COPY --from=transitionpt_backoffice-build /app/packages/tp_geolocation /app/packages/tp_geolocation
COPY --from=transitionpt_backoffice-build /app/packages/tp_components /app/packages/tp_components
# WORKAROUND: lerna compiles packages as a symlink in node_modules, which will not work with next start command. Full compiled folder is needed
COPY --from=transitionpt_backoffice-build /app/packages/tp_backoffice/node_modules /app/packages/tp_backoffice/node_modules
copy --from=transitionpt_backoffice-build /app/packages/tp_translations /app/packages/tp_backoffice/node_modules/@transitionpt/translations/
RUN ls -l /app/packages/tp_backoffice/node_modules/@transitionpt
RUN ls -l /app/node_modules
#copy --from=transitionpt_backoffice-build /app/packages/tp_geolocation /app/packages/tp_backoffice/node_modules/@transitionpt/geolocation/
#copy --from=transitionpt_backoffice-build /app/packages/tp_components /app/packages/tp_backoffice/node_modules/@transitionpt/components/
#copy --from=transitionpt_backoffice-build /app/node_modules /app/node_modules

WORKDIR /app/packages/tp_backoffice

RUN npm run install --loglevel verbose
RUN ls -l /app/packages/tp_backoffice/node_modules

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ARG NEXT_PUBLIC_CLIENT_ID
ENV NEXT_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_CLIENT_ID

ARG NEXT_PUBLIC_CLIENT_SECRET
ENV NEXT_PUBLIC_CLIENT_SECRET=$NEXT_PUBLIC_CLIENT_SECRET

ARG NEXT_PUBLIC_HOME_URL
ENV NEXT_PUBLIC_HOME_URL=$NEXT_PUBLIC_HOME_URL

ARG NEXT_PUBLIC_AUTH_URL
ENV NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ARG AUTH_API_URL
ENV AUTH_API_URL=$AUTH_API_URL

ARG AUTH_API_CLIENT_ID
ENV AUTH_API_CLIENT_ID=$AUTH_API_CLIENT_ID

ARG AUTH_API_CLIENT_SECRET
ENV AUTH_API_CLIENT_SECRET=$AUTH_API_CLIENT_SECRET

RUN npm run build




# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app/packages/tp_backoffice

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=final-transitionpt_backoffice-build-stage /app/packages/tp_backoffice/next.config.js ./
COPY --from=final-transitionpt_backoffice-build-stage /app/packages/tp_backoffice/public ./public
COPY --from=final-transitionpt_backoffice-build-stage --chown=nextjs:nodejs /app/packages/tp_backoffice/.next ./.next
COPY --from=final-transitionpt_backoffice-build-stage /app/packages/tp_backoffice/package.json ./package.json

# import needed packages
COPY --from=final-transitionpt_backoffice-build-stage /app/node_modules ./node_modules
copy --from=final-transitionpt_backoffice-build-stage /app/packages/tp_translations ./node_modules/@transitionpt/translations
copy --from=final-transitionpt_backoffice-build-stage /app/packages/tp_geolocation ./node_modules/@transitionpt/geolocation
copy --from=final-transitionpt_backoffice-build-stage /app/packages/tp_components ./node_modules/@transitionpt/components

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]
