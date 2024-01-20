# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

ARG VITE_API_ENDPOINT=https://split-api.backtothe.cloud
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}

COPY package.json /app

RUN npm install

ENV NODE_ENV=production

COPY . /app

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/local/bin

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]