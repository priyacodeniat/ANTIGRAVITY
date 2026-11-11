# Production Multi-Stage Dockerfile for AgriAssist AI Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json tsconfig*.json vite.config.ts tailwind.config.js postcss.config.js index.html ./

# Install dependencies
RUN npm ci

# Copy source code and assets
COPY public/ ./public/
COPY src/ ./src/

# Build static assets for production
RUN npm run build

# Stage 2: Serve via high-performance Nginx
FROM nginx:1.27-alpine AS runner

# Copy customized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
