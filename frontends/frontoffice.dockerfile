FROM node:14 as base
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./

# Package @transitionpt/translations
FROM base as transitionpt_translations-build
WORKDIR /app/packages/tp_translations

COPY  packages/tp_translations/package.json packages/tp_translations/ 

WORKDIR /app/
RUN npx lerna bootstrap --hoist --scope=@transitionpt/translations --includeDependencies
WORKDIR /app/packages/tp_translations

RUN npm run tsc

# Package @transitionpt/home
FROM base as transitionpt_home-build
WORKDIR /app/packages/tp_home

COPY  packages/tp_home/package.json packages/tp_home/ 

WORKDIR /app/
RUN npx lerna bootstrap --hoist --scope=@transitionpt/home --includeDependencies
WORKDIR /app/packages/tp_home

RUN npm run build

# final stage
FROM base
COPY --from=transitionpt_translations-build /app/packages/tp_translations /app/packages/tp_translations
COPY --from=transitionpt_home-build /app/packages/tp_home /app/packages/tp_home

# Production image, copy all the files and run next
FROM node:14 AS runner
WORKDIR /app/packages/tp_home

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/packages/tp_home/next.config.js ./
COPY --from=builder /app/packages/tp_home/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/packages/tp_home/.next ./.next
COPY --from=builder /app/packages/tp_home/node_modules ./node_modules
COPY --from=builder /app/packages/tp_home/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]
