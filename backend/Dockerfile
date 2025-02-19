FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    openssl \
    libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && \
    npm install --fetch-timeout=600000

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy remaining files
COPY . .

# Build TypeScript code
RUN npm run build

# Add wait-for-db script
COPY ./scripts/wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

EXPOSE 3001

# Start the application
CMD ["/wait-for-db.sh"] 