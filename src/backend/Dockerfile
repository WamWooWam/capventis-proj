
FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r compile
RUN pnpm deploy --filter=backend --prod /prod/backend

FROM base AS runner
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend
ENV NODE_ENV production

EXPOSE 4000

ENV PORT 4000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "dist/index.js"]

