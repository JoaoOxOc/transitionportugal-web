FROM node:16 as base
WORKDIR /app/
#COPY ./package.json ./
#COPY ./lerna.json ./
COPY ./package.json /app/
RUN npm install --force
COPY ./lerna.json /app/




# Package @transitionpt/backoffice and it's dependencies
FROM base as transitionpt_backoffice-build
WORKDIR /app/

# tp_translations is a dependency in tp_backoffice, install it's dependencies
COPY  packages/tp_translations/package.json /app/packages/tp_translations/package.json
COPY  packages/tp_translations/ /app/packages/tp_translations/ 
RUN npx lerna bootstrap --scope=@transitionpt/translations --includeDependencies

# compile tp_translations
RUN npx lerna run tsc --stream

# install tp_backoffice dependencies
COPY  packages/tp_backoffice/package.json /app/packages/tp_backoffice/package.json
COPY  packages/tp_backoffice/ /app/packages/tp_backoffice/ 

RUN npx lerna bootstrap --hoist --scope=@transitionpt/backoffice --includeDependencies

# WORKAROUND: lerna compiles tp_translations as a symlink in node_modules, which will not work with next start command
RUN rm -rf /app/packages/tp_backoffice/node_modules/@transitionpt/





# final stage
FROM base as final-transitionpt_backoffice-build-stage

COPY --from=transitionpt_backoffice-build /app/packages/tp_backoffice /app/packages/tp_backoffice
COPY --from=transitionpt_backoffice-build /app/packages/tp_translations /app/packages/tp_translations
# WORKAROUND: lerna compiles tp_translations as a symlink in node_modules, which will not work with next start command. Full compiled folder is needed
copy --from=transitionpt_backoffice-build /app/packages/tp_translations /app/packages/tp_backoffice/node_modules/@transitionpt/translations/
copy --from=transitionpt_backoffice-build /app/node_modules /app/node_modules

WORKDIR /app/packages/tp_backoffice

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ARG NEXT_PUBLIC_CLIENT_ID
ENV NEXT_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_CLIENT_ID

ARG NEXT_PUBLIC_CLIENT_SECRET
ENV NEXT_PUBLIC_CLIENT_SECRET=$NEXT_PUBLIC_CLIENT_SECRET

ARG NEXT_PUBLIC_HOME_URL
ENV NEXT_PUBLIC_HOME_URL=$NEXT_PUBLIC_HOME_URL


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

USER nextjs

EXPOSE 3000

ENV PORT 3000



# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]
