#!/bin/bash
set -e

echo "🔄 Updating Axium..."

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull
fi

# Stop current services
echo "⏹️  Stopping current services..."
docker-compose --env-file .env.docker down

# Remove old images to force rebuild
echo "🗑️  Removing old images..."
docker-compose --env-file .env.docker down --rmi all

# Rebuild and start services
echo "🔨 Rebuilding application..."
docker-compose --env-file .env.docker build --no-cache axium

echo "🚀 Starting updated services..."
docker-compose --env-file .env.docker up -d

echo "⏳ Waiting for services to start..."
sleep 15

# Check if services are running
if docker-compose --env-file .env.docker ps | grep -q "Up"; then
    echo "✅ Axium updated successfully!"
    echo "🌐 Access your application at: http://localhost:3000"
    echo "📊 View logs with: docker-compose --env-file .env.docker logs -f axium"
else
    echo "❌ Update failed. Check logs with: docker-compose --env-file .env.docker logs"
    exit 1
fi