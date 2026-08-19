FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev || true
COPY . .
RUN npm run build || true
CMD ["node","dist/main.js"]
