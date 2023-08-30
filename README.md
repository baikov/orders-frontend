# Frontend for Orders project

Other parts:

1. [Revers-proxy](https://github.com/baikov/orders-traefik)
2. [Front](https://github.com/baikov/orders-frontend)
3. [Back](https://github.com/baikov/orders-backend)

## Local development

### Preparation

1. Copy `.env.example` and rename it to `.env`
1. Install Node v18
1. Install and activate all recomended `VSCode` extensions
1. Enable [Take Over Mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode):
    - `Ctrl + Shift + P` (macOS: `Cmd + Shift + P`).
    - Type `built` and select `Extensions: Show Built-in Extensions`.
    - Type `typescript` in the extension search box (do not remove `@builtin` prefix).
    - Click the little gear icon of `TypeScript and JavaScript Language Features`, and select `Disable (Workspace)`.
1. Install `yarn`:
    ```shell
    npm install --global yarn
    ```
1. Install all packages
    ```shell
    yarn
    ```
1. Run `yarn typecheck` for type checking
1. Run `yarn lint` for linting


Choose one of `.env` presets. HMR working in all modes.

> To use `Mode 1` and `Mode 2`, a raised container from [this repo](https://github.com/baikov/orders-traefik) with Traefik is required. Because an external network to which frontend and backend containers are connected is created in Traefik compose.

### Mode 0: As separate dev server on custom port

1. No need for a Traefik container
1. Set `uniqe` project name
    ```env
    COMPOSE_PROJECT_NAME=orders
    ```
1. Uncomment `Mode 0` block:
    ```env
    # Mode 0: As separate dev server on custom port
    COMPOSE_FILE=local.yml
    DOMAIN=localhost
    NUXT_DOCKER_PORT=3018  # custom port
    HMR_DOCKER_PORT=24678
    ```
1. Run `docker compose build` and `docker compose up -d`

### Mode 1: As dev server behind the Traefik with http

1. The Traefik container must be running in `Mode 1`
1. Set the project name same as `COMPOSE_PROJECT_NAME` in Traefik `.env`
    ```env
    COMPOSE_PROJECT_NAME=orders
    ```
1. Uncomment `Mode 1` block:
    ```env
    # Mode 1: As dev server behind the Traefik with http
    # For Windows users: use `;` (semicolon) as separator - local.yml;local.traefik.yml
    COMPOSE_FILE=local.yml:local.traefik.yml
    DOMAIN=localhost  # or another aliace for 127.0.0.1 declared in etc/hosts, but same as DOMAIN in Traefik .env!
    ```
1. Run Traefik container, then run Nuxt container with `docker compose build` and `docker compose up -d`

### Mode 2: As dev server behind the Traefik + SSL and custom domain

1. The Traefik container must be running in `Mode 2`
1. Set the project name same as `COMPOSE_PROJECT_NAME` in Traefik `.env`
    ```env
    COMPOSE_PROJECT_NAME=orders
    ```
1. Uncomment `Mode 2` block:
    ```env
    # Mode 2: As dev server behind the Traefik + SSL and custom domain
    # For Windows users: use `;` (semicolon) as separator - local.yml;local.traefik.yml;local.traefik.ssl.yml
    COMPOSE_FILE=local.yml:local.traefik.yml:local.traefik.ssl.yml
    DOMAIN=orders.local  # same as DOMAIN in Traefik .env!
    ```
1. Run Traefik container, then run Nuxt container with `docker compose build` and `docker compose up -d`

## Deploy to production

### Mode 3: SSR (Universal rendering) with Node.js server

1. The Traefik container must be running in `Mode 3` on prod server
1. Copy `.env.example` and rename it to `.env` on prod server
1. Set the project name same as `COMPOSE_PROJECT_NAME` in Traefik `.env`
    ```env
    COMPOSE_PROJECT_NAME=orders
    ```
1. Uncomment `Mode 3` block:
    ```env
    # Mode 3: For production with SSR
    COMPOSE_FILE=production.yml
    DOMAIN=orders.baikov.dev
    ```
1. Run container with `docker compose build` and `docker compose up -d`

### Mode 4: SPA with Nginx

coming soon...
