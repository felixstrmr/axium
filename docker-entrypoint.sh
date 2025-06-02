#!/bin/sh
set -e

echo "🚀 Starting Axium deployment..."

# Install netcat for database connectivity check
apk add --no-cache netcat-openbsd

# Extract database connection details from DATABASE_URL
DB_HOST=$(echo $DATABASE_URL | sed -n 's|.*://[^:]*:[^@]*@\([^:]*\):.*|\1|p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's|.*://[^:]*:[^@]*@[^:]*:\([0-9]*\)/.*|\1|p')

# Use environment variables if extraction fails
DB_HOST=${DB_HOST:-${DATABASE_HOST:-localhost}}
DB_PORT=${DB_PORT:-${DATABASE_PORT:-5432}}

# Wait for database to be ready
echo "⏳ Waiting for database to be ready ($DB_HOST:$DB_PORT)..."
timeout=60
counter=0

while ! nc -z $DB_HOST $DB_PORT; do
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
if npx drizzle-kit generate && npx drizzle-kit migrate; then
  echo "✅ Database migrations completed successfully!"
else
  echo "❌ Database migrations failed!"
  exit 1
fi

# Start the application
echo "🎉 Starting Axium server..."
exec node server.js