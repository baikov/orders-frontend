# Build
FROM node:21.6.1-alpine as builder

WORKDIR /nuxt

COPY package*.json ./
COPY ./yarn.lock ./

ENV NODE_OPTIONS --max_old_space_size=950

RUN yarn install --prefer-offline --pure-lockfile --non-interactive --production=false

COPY . .

RUN yarn build

# Run
FROM node:21.6.1-alpine as prod

ENV NODE_ENV production
WORKDIR /nuxt

COPY --from=builder /nuxt/package.json ./package.json
COPY --from=builder /nuxt/yarn.lock ./yarn.lock

COPY --from=builder /nuxt/.output ./.output
