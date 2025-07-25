#!/bin/sh

# Generate ENCRYPTION_KEY if not set
if [ -z "$ENCRYPTION_KEY" ]; then
  export ENCRYPTION_KEY=$(openssl rand -base64 32)
  echo "[INFO] Generated ENCRYPTION_KEY for this container instance."
fi

# Warn if running in production without a persistent key
echo "[WARNING] ENCRYPTION_KEY is ephemeral and will change on container restart unless set externally."

# Execute the main container command
exec "$@"
