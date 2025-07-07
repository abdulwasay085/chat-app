# Base image
FROM node:20.20.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production server
FROM nginx:latest
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
