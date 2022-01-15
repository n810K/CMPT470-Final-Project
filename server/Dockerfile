FROM node:16.2-alpine as base
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN  yarn install 
COPY . .
FROM base as production
ENV NODE_PATH=./dist
RUN yarn run build


# # FOR M1 MACs
# FROM node:16.2-alpine as base
# WORKDIR /app
# COPY package.json ./
# COPY yarn.lock ./
# RUN apk --no-cache --virtual build-dependencies add \
#         python2 \
#         make \
#         g++ \
# 	&& yarn install \
# 	&& apk del build-dependencies
# COPY . .
# FROM base as production
# ENV NODE_PATH=./dist
# RUN yarn run build
