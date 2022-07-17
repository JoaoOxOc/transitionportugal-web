FROM node:16 as base
WORKDIR /app/
#COPY ./package.json ./
#COPY ./lerna.json ./
COPY ./package.json /app/
RUN npm install
COPY ./lerna.json /app/




# Package @transitionpt/home and it's dependencies
FROM base as transitionpt_home-build
WORKDIR /app/

# tp_translations is a dependency in tp_home, install it's dependencies
COPY  packages/tp_translations/package.json /app/packages/tp_translations/package.json
COPY  packages/tp_translations/ /app/packages/tp_translations/ 
RUN npx lerna bootstrap --scope=@transitionpt/translations --includeDependencies

# compile tp_translations
RUN npx lerna run tsc --stream

# install tp_home dependencies
COPY  packages/tp_home/package.json /app/packages/tp_home/package.json
COPY  packages/tp_home/ /app/packages/tp_home/ 

RUN npx lerna bootstrap --hoist --scope=@transitionpt/home --includeDependencies

# WORKAROUND: lerna compiles tp_translations as a symlink in node_modules, which will not work with next start command
RUN rm -rf /app/packages/tp_home/node_modules/@transitionpt/





# final stage
FROM base as final-transitionpt_home-build-stage

COPY --from=transitionpt_home-build /app/packages/tp_home /app/packages/tp_home
COPY --from=transitionpt_home-build /app/packages/tp_translations /app/packages/tp_translations
# WORKAROUND: lerna compiles tp_translations as a symlink in node_modules, which will not work with next start command. Full compiled folder is needed
copy --from=transitionpt_home-build /app/packages/tp_translations /app/packages/tp_home/node_modules/@transitionpt/translations/
copy --from=transitionpt_home-build /app/node_modules /app/node_modules

WORKDIR /app/packages/tp_home

ARG NEXT_PUBLIC_AUTH_URL
ENV NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL

ARG CMS_BASE_URL
ENV CMS_BASE_URL=$CMS_BASE_URL
ARG SSR_CMS_BASE_URL
ENV SSR_CMS_BASE_URL=$SSR_CMS_BASE_URL

ARG CMS_API_TOKEN
ENV CMS_API_TOKEN=$CMS_API_TOKEN


RUN npm run build




# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app/packages/tp_home

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=final-transitionpt_home-build-stage /app/packages/tp_home/next.config.js ./
COPY --from=final-transitionpt_home-build-stage /app/packages/tp_home/assets ./assets
COPY --from=final-transitionpt_home-build-stage /app/packages/tp_home/public ./public
COPY --from=final-transitionpt_home-build-stage --chown=nextjs:nodejs /app/packages/tp_home/.next ./.next
COPY --from=final-transitionpt_home-build-stage /app/packages/tp_home/package.json ./package.json

# import needed packages
COPY --from=final-transitionpt_home-build-stage /app/node_modules ./node_modules
copy --from=final-transitionpt_home-build-stage /app/packages/tp_translations ./node_modules/@transitionpt/translations

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]