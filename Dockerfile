# ==============================================================================
# Production Dockerfile for Competitor Ad Intelligence Engine
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Install dependencies (only production dependencies)
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY backend ./backend
COPY frontend ./frontend
COPY server.js ./
COPY .env.example ./

# Expose server port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["npm", "start"]
