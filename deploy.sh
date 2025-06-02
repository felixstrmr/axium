#!/bin/bash
set -e

echo "🚀 Deploying Axium..."

# Check if .env.docker exists
if [ ! -f ".env.docker" ]; then
    echo "❌ .env.docker file not found!"
    echo "Please copy .env.docker.example to .env.docker and configure it."
    exit 1
fi

# Generate package-lock.json if it doesn't exist (for npm-based Docker build)
if [ ! -f "package-lock.json" ] && [ ! -f "bun.lockb" ]; then
    echo "📦 Generating package-lock.json..."
    node generate-lockfile.js
fi

# Build and start services
echo "🔨 Building Docker images..."
docker-compose --env-file .env.docker build --no-cache

echo "🔄 Starting services..."
docker-compose --env-file .env.docker up -d

echo "⏳ Waiting for services to start..."
sleep 15

# Check if services are running
if docker-compose --env-file .env.docker ps | grep -q "Up"; then
    echo "✅ Axium deployed successfully!"
    echo "🌐 Access your application at: http://localhost:3000"
    echo "📊 View logs with: docker-compose --env-file .env.docker logs -f axium"
    echo "🔍 Check application logs: docker-compose --env-file .env.docker logs axium"
else
    echo "❌ Deployment failed. Check logs with: docker-compose --env-file .env.docker logs"
    exit 1
fi