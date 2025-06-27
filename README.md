# Axium

A modern, open-source remote server management platform that enables IT teams to efficiently manage and connect to their servers via SSH, VNC, and RDP protocols.

## ✨ Features

- **Multi-Protocol Support**: Connect to servers using SSH, VNC, or RDP
- **Web-Based Interface**: Manage all your servers from a single, intuitive dashboard
- **Self-Hosted**: Complete control over your infrastructure and data
- **Team Collaboration**: Built for IT teams with role-based access control
- **Real-Time Connections**: Seamless remote access to your servers
- **Modern Tech Stack**: Built with cutting-edge technologies for performance and reliability

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Monorepo**: Turborepo for efficient development workflow
- **Authentication**: better-auth for secure user management
- **Database**: Drizzle ORM for type-safe database operations
- **Self-Hostable**: Deploy on your own infrastructure

# 🚀 Quick Start

### Prerequisites

- Node.js 18+
- bun
- Database (PostgreSQL, MySQL, or SQLite)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/felixstrmr/axium.git
cd axium
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cd /apps/main
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```env
DATABASE_URL="your-database-connection-string"
BETTER_AUTH_SECRET="your-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

5. Run database migrations:

```bash
bun run db:migrate
```

6. Start the development server:

```bash
bun run dev
```

Visit `http://localhost:3000` to access Axium.
