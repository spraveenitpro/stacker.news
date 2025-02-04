# syntax=docker/dockerfile:1

FROM node:14.21.3-bullseye

ENV NODE_ENV=development

WORKDIR /app

EXPOSE 3000

CMD npm install --loglevel verbose; npx prisma migrate dev; npm run dev