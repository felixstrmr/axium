import { db } from '@/db';
import { servers } from '@/db/schema';
import { decrypt } from '@/utils/encryption';
import { eq } from 'drizzle-orm';
import { NodeSSH } from 'node-ssh';
class SSHManager {
    constructor() {
        this.connections = new Map();
    }
    async createConnection(socketId, serverId, userId) {
        try {
            // Get server details with credentials
            const server = await db.query.servers.findFirst({
                where: eq(servers.id, serverId),
                with: {
                    credential: true,
                },
            });
            if (!server) {
                throw new Error('Server not found');
            }
            const ssh = new NodeSSH();
            // Prepare connection config
            const config = {
                host: server.host,
                port: server.port,
                username: server.username || server.credential?.username,
                keepaliveInterval: 30000,
            };
            // Handle authentication
            if (server.password) {
                config.password = decrypt(server.password);
            }
            else if (server.credential?.password) {
                config.password = decrypt(server.credential.password);
            }
            // Connect to server
            await ssh.connect(config);
            // Request shell
            const shell = await ssh.requestShell({
                cols: 80,
                rows: 24,
                term: 'xterm-256color',
            });
            // Store connection
            this.connections.set(socketId, {
                ssh,
                shell,
                serverId,
                userId,
            });
            console.log(`SSH connection established for socket ${socketId}`);
        }
        catch (error) {
            console.error('SSH connection failed:', error);
            throw error;
        }
    }
    getConnection(socketId) {
        return this.connections.get(socketId);
    }
    async closeConnection(socketId) {
        const connection = this.connections.get(socketId);
        if (connection) {
            try {
                connection.shell?.end();
                connection.ssh?.dispose();
                this.connections.delete(socketId);
                console.log(`SSH connection closed for socket ${socketId}`);
            }
            catch (error) {
                console.error('Error closing SSH connection:', error);
            }
        }
    }
    async closeAllConnections() {
        const promises = Array.from(this.connections.keys()).map((socketId) => this.closeConnection(socketId));
        await Promise.all(promises);
    }
}
export const sshManager = new SSHManager();
