![hero](github.jpg)

<div align="center">
  <h1 align="center">Axium</h1>
  <p>Self-hostable server management solution for IT teams to connect and manage their servers via SSH, VNC, and RDP.</p>
</div>

---

## ✨ Features

### 🔐 **Secure Authentication**

- Email/password authentication with Better Auth
- Microsoft OAuth integration
- Session management with impersonation support
- User roles and permissions

### 🖥️ **Multi-Protocol Server Access**

- **SSH**: Full terminal access with xterm.js integration
- **VNC**: Visual remote desktop connections
- **RDP**: Windows Remote Desktop Protocol support
- Real-time terminal sessions with Socket.IO

### 🗂️ **Organization & Management**

- **Environments**: Color-coded server grouping (Production, Staging, Development)
- **Folders**: Hierarchical server organization
- **Credentials**: Encrypted credential management per environment
- **User Management**: Multi-user support with admin controls

### 🛡️ **Security Features**

- AES-256-GCM credential encryption
- Environment-based access control
- Secure password storage with salt-based key derivation
- Session-based authentication

### 🎨 **Modern UI/UX**

- Clean, intuitive dashboard built with Tailwind CSS
- Dark/light theme support
- Responsive design for all devices
- Real-time server status indicators

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/felixstrmr/axium.git
   cd axium
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/axium"

   # Authentication
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"

   # Encryption (generate with crypto.randomBytes(32).toString('base64'))
   ENCRYPTION_KEY="your-encryption-key-here"
   ```

5. **Database setup**

   ```bash
   bun run db:push
   ```

6. **Start the development server**

   ```bash
   bun dev
   ```

7. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

---
