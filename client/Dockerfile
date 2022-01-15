FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # FOR M1 MACs
# FROM node:16-alpine as base
# WORKDIR /app
# COPY package.json ./
# COPY yarn.lock .

# RUN apk --no-cache --virtual build-dependencies add \
#         python2 \
#         make \
#         g++ \
# && yarn install \
# && apk del build-dependencies
# COPY . .
# EXPOSE 3000
# CMD ["yarn", "start"]


