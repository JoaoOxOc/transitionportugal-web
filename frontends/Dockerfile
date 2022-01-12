FROM node:14 as base
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./
# Package @transitionpt/backoffice
FROM base as transitionpt_backoffice-build
WORKDIR /app/packages/tp_backoffice

COPY  packages/tp_backoffice/package.json packages/tp_backoffice/ 

WORKDIR /app/
RUN npx lerna bootstrap --hoist --scope=@transitionpt/backoffice --includeDependencies
WORKDIR /app/packages/tp_backoffice

RUN npm run build
# Package @transitionpt/home
FROM base as transitionpt_home-build
WORKDIR /app/packages/tp_home

COPY  packages/tp_home/package.json packages/tp_home/ 

WORKDIR /app/
RUN npx lerna bootstrap --hoist --scope=@transitionpt/home --includeDependencies
WORKDIR /app/packages/tp_home

RUN npm run build
# Package @transitionpt/translations
FROM base as transitionpt_translations-build
WORKDIR /app/packages/tp_translations

COPY  packages/tp_translations/package.json packages/tp_translations/ 

WORKDIR /app/
RUN npx lerna bootstrap --hoist --scope=@transitionpt/translations --includeDependencies
WORKDIR /app/packages/tp_translations

# Package @transitionpt/generic_header
FROM base as transitionpt_generic_header-build
WORKDIR /app/packages/tp_generic_header

COPY  packages/tp_generic_header/package.json packages/tp_generic_header/ 

WORKDIR /app/
COPY --from=transitionpt_translations-build /app/packages/tp_translations/package.json /app/packages/tp_translations/
RUN npx lerna bootstrap --hoist --scope=@transitionpt/generic_header --includeDependencies
COPY --from=transitionpt_translations-build /app/packages/tp_translations/ /app/packages/tp_translations/
WORKDIR /app/packages/tp_generic_header

RUN npm run build
# final stage
FROM base
COPY --from=transitionpt_backoffice-build /app/packages/tp_backoffice /app/packages/tp_backoffice
COPY --from=transitionpt_home-build /app/packages/tp_home /app/packages/tp_home
COPY --from=transitionpt_translations-build /app/packages/tp_translations /app/packages/tp_translations
COPY --from=transitionpt_generic_header-build /app/packages/tp_generic_header /app/packages/tp_generic_header