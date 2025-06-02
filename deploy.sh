#!/bin/bash

echo "🚀 Deploying Axium with Docker and Bun..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    
    echo "🔐 Generating secrets..."
    
    # Generate BETTER_AUTH_SECRET
    BETTER_AUTH_SECRET=$(openssl rand -base64 32)
    sed -i "s/your-super-secret-auth-key-here-min-32-chars/$BETTER_AUTH_SECRET/" .env
    
    # Generate ENCRYPTION_KEY
    ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
    sed -i "s/your-encryption-key-here-base64-format/$ENCRYPTION_KEY/" .env
    
    echo "✅ Secrets generated! Please update NEXT_PUBLIC_APP_URL and Microsoft OAuth settings in .env if needed."
    echo "📁 .env file created with generated secrets."
    echo ""
fi

# Check if bun.lockb exists
if [ ! -f bun.lockb ]; then
    echo "❌ bun.lockb not found. Please run 'bun install' first to generate the lockfile."
    exit 1
fi

echo "🏗️  Building and starting containers..."
docker-compose up -d --build

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "🗄️  Running database migrations..."
docker-compose exec -T axium bun run db:push

echo "✅ Deployment complete!"
echo "🌐 Axium is running at: http://localhost:3000"
echo ""
echo "📋 Useful commands:"
echo "  View logs:           docker-compose logs -f axium"
echo "  Stop services:       docker-compose down"
echo "  Restart services:    docker-compose restart"
echo "  Update application:  docker-compose up -d --build"
echo ""
echo "🔧 If you need to update environment variables, edit .env and run:"
echo "   docker-compose up -d --force-recreate"