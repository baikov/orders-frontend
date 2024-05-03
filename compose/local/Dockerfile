FROM node:22.1.0-alpine as base

ENV NODE_ENV=development

WORKDIR /nuxt

# Build
FROM base as build

COPY --link package.json yarn.lock .
RUN yarn install --non-interactive --production=false

# Run
FROM base

COPY --from=build /nuxt/node_modules /nuxt/node_modules
