FROM oven/bun:alpine

WORKDIR /app

COPY bun.lock package.json ./
RUN bun install

COPY . .

EXPOSE 3002

CMD ["bun", "run", "index.js"]