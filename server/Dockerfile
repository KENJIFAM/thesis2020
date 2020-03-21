FROM node:13-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
RUN yarn run build
CMD ["yarn", "start"]