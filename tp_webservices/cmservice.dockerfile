FROM node:16
# Installing libvips-dev for sharp Compatability
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./APIs/ContentManageService2/package.json ./APIs/ContentManageService2/package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
WORKDIR /opt/app
COPY ./APIs/ContentManageService2/ .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"]