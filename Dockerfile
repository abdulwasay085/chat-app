# Stage 1: Build stage
FROM node:20-alpine AS build

# Working directory inside container
WORKDIR /app

# Copy package.json and lock files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of your project files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx.conf (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
