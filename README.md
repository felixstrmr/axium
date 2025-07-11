# Axium

A modern server management platform built with Next.js, TypeScript, and Tailwind CSS. Axium provides secure remote access to servers through SSH, VNC, and RDP connections with a beautiful, responsive web interface.

## 🚀 Features

- **Multi-Protocol Support**: Connect to servers via SSH, VNC, and RDP
- **Real-time Terminal**: Built-in SSH terminal with xterm.js
- **Secure Authentication**: User authentication and credential management
- **Environment Management**: Organize servers by environments
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and Shadcn UI
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Shadcn UI, Lucide React
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Terminal**: xterm.js for SSH connections
- **State Management**: Zustand
- **Build Tool**: Turbo (Monorepo)
- **Package Manager**: Bun

## 📦 Project Structure

```
axium/
├── apps/
│   └── core/                 # Main Next.js application
│       ├── app/             # Next.js app router
│       ├── components/      # React components
│       ├── queries/         # Database queries
│       └── schemas/         # Zod validation schemas
├── packages/
│   ├── auth/               # Authentication utilities
│   ├── database/           # Database schema and migrations
│   ├── ui/                 # Shared UI components
│   └── utils/              # Shared utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun 1.2.15+
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd axium
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp apps/core/.env.example apps/core/.env
   ```

   Configure the following variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `ENCRYPTION_KEY`: Secret for authentication

4. **Run database migrations**

   ```bash
   cd packages/database
   bun run drizzle-kit push
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:3000`

## 🏗️ Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run check-types` - Type checking

### Database Migrations

```bash
cd packages/database
bun run db:generate
bun run db:migrate
```

## 🔧 Architecture

### Core Components

- **Server Management**: Add, edit, and organize servers
- **Connection Types**: SSH, VNC, and RDP support
- **Credential Management**: Secure storage of connection credentials
- **Environment Organization**: Group servers by environment
- **Real-time Terminal**: Web-based SSH terminal

### Database Schema

- **Servers**: Server information and metadata
- **Server Connections**: Connection details (SSH, VNC, RDP)
- **Credentials**: Secure credential storage
- **Environments**: Environment organization
- **Users**: User authentication and management

## 🔒 Security

- Secure credential storage with encryption
- User authentication and authorization
- Input validation with Zod schemas
- SQL injection protection with Drizzle ORM

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Please contact the maintainers for contribution guidelines.
