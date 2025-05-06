# Stage 1: Build frontend
FROM node:20 AS frontend-build
WORKDIR /app
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY src ./src
COPY public ./public
RUN npm install
RUN npm run build

# Stage 2: Run backend and serve frontend
FROM node:20
WORKDIR /app
COPY --from=frontend-build /app/dist ./dist
COPY package*.json ./
COPY server.js ./
COPY .env ./
RUN npm install --omit=dev

EXPOSE 3001
EXPOSE 5173

CMD node server.js 