# Use Bun's official image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies into temp directory
FROM base AS install
RUN mkdir -p /temp/dev
# Copy package.json and any lock files that might exist
COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lockb* ./
RUN bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lockb* ./
RUN bun install --frozen-lockfile --production

# Copy node_modules from temp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /app/node_modules node_modules
COPY . .

# Build the application
ENV NODE_ENV=production
RUN bun run build

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /app/node_modules node_modules
COPY --from=prerelease /app/.next .next
COPY --from=prerelease /app/public public
COPY --from=prerelease /app/package.json .
COPY --from=prerelease /app/server.js .
COPY --from=prerelease /app/drizzle drizzle

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunuser

USER bunuser

# Expose port
EXPOSE 3000/tcp

# Run the app
ENTRYPOINT [ "bun", "run", "start" ]