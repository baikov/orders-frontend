[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)
# Nuxt 3 production-ready template (with TailwindCSS)

Other parts:

1. [Traefik 2.10 as revers-proxy in Docker (SSL in dev and prod)](https://github.com/baikov/tpl-traefik)
2. [Nuxt 3 production-ready template in Docker (SPA/SSR)](https://github.com/baikov/tpl-nuxt3)
3. [Django/DRF backend in Docker (based on django-cookiecutter)](https://github.com/baikov/drf-tpl)

## Improvement plan

- [x] Add NuxtUI
- [x] Add SEO modules
- [x] Add `@vueuse/nuxt`, `@nuxt/image-edge`, `@nuxtjs/google-fonts`
- [ ] Add registration/authentication (with `@pinia/nuxt`)
- [ ] Add SPA mode with Nginx

## Local development

Choose one of `.env` presets. HMR working in all modes.

> To use `Mode 1` and `Mode 2`, a raised container from [this repo](https://github.com/baikov/tpl-traefik) with Traefik is required. Because an external network to which frontend and backend containers are connected is created in Traefik compose.

### Mode 0: As separate dev server on custom port

1. No need for a Traefik container
1. Rename `.env.example` to `.env`
1. Set `uniqe` project name
    ```env
    COMPOSE_PROJECT_NAME=uniqe_name
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
1. Rename `.env.example` to `.env`
1. Set the project name same as `COMPOSE_PROJECT_NAME` in Traefik `.env`
    ```env
    COMPOSE_PROJECT_NAME=example
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
1. Rename `.env.example` to `.env`
1. Set the project name same as `COMPOSE_PROJECT_NAME` in Traefik `.env`
    ```env
    COMPOSE_PROJECT_NAME=example
    ```
1. Uncomment `Mode 2` block:
    ```env
    # Mode 2: As dev server behind the Traefik + SSL and custom domain
    # For Windows users: use `;` (semicolon) as separator - local.yml;local.traefik.yml;local.traefik.ssl.yml
    COMPOSE_FILE=local.yml:local.traefik.yml:local.traefik.ssl.yml
    DOMAIN=tpl.local  # same as DOMAIN in Traefik .env!
    ```
1. Run Traefik container, then run Nuxt container with `docker compose build` and `docker compose up -d`

### Notes for an optimal dev settings

- **Node.js:** Make sure to use an even numbered version (18, 20, etc)
- **Nuxtr:** Install the community-developed [Nuxtr extension](https://marketplace.visualstudio.com/items?itemName=Nuxtr.nuxtr-vscode)
- **Volar:** Either enable [Take Over Mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode) and install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

If you have enabled **Take Over Mode** you can disable generating the shim for *.vue files in your `nuxt.config.ts` file:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    shim: false
  }
})
```

## Deploy to production

> Using this modes assumes that the `your-domain.com` is already bound to your server (`A` records are configured) and Traefik container raised in production mode

### Mode 3: SSR (Universal rendering) with Node.js server

1. The Traefik container must be running in `Mode 3` on prod server
1. Rename `.env.example` to `.env`
1. Set the project name same as `COMPOSE_PROJECT_NAME` in Traefik `.env`
    ```env
    COMPOSE_PROJECT_NAME=example
    ```
1. Uncomment `Mode 3` block:
    ```env
    # Mode 3: For production with SSR
    COMPOSE_FILE=production.yml
    DOMAIN=your-domain.com
    ```
1. Run container with `docker compose build` and `docker compose up -d`

### Mode 4: SPA with Nginx

coming soon...

## Contributing

I made this template for myself, but it's awesom if it helps someone else. The settings are far from ideal, so fell free to make a pull request.
