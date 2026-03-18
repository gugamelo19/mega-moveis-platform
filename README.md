# Mega Móveis Platform

Plataforma full stack para catálogo digital de móveis e eletrodomésticos, com área pública, painel administrativo e conversão via WhatsApp.

## Estrutura do projeto

apps/
web/ -> frontend em Next.js
api/ -> backend em NestJS

packages/
config/ -> compartilhamentos futuros de configuração
types/ -> tipos compartilhados no futuro

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- NestJS
- Prisma
- PostgreSQL
- Cloudinary
- Turborepo
- pnpm

## Scripts principais

- `pnpm dev` -> sobe os apps do monorepo
- `pnpm dev:web` -> sobe apenas o frontend
- `pnpm dev:api` -> sobe apenas o backend
- `pnpm build` -> build do monorepo
- `pnpm lint` -> lint do monorepo
- `pnpm format` -> formatação do monorepo
