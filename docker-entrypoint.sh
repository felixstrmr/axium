#!/bin/sh
set -e

echo "🚀 Starting Axium deployment..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
timeout=60
counter=0

while ! nc -z ${DATABASE_HOST:-localhost} ${DATABASE_PORT:-5432}; do
  counter=$((counter + 1))
  if [ $counter -gt $timeout ]; then
    echo "❌ Timeout waiting for database"
    exit 1
  fi
  echo "Waiting for database... ($counter/$timeout)"
  sleep 1
done

echo "✅ Database is ready!"

# Run database migrations
echo "🔄 Running database migrations..."
if npm run db:push; then
  echo "✅ Database migrations completed successfully!"
else
  echo "❌ Database migrations failed!"
  exit 1
fi

# Start the application
echo "🎉 Starting Axium server..."
exec node server.js