import net from 'net';
import appConfig from '../4-utils/app-config';

class TcpClient {

    private client: net.Socket;

    constructor() {
        this.client = net.createConnection({ host: appConfig.controlDeviceHost, port: 8099 }, () => {console.log('Connected to vMix');});
        this.client.on('close', () => {console.log('Disconnected from the server');});
        this.client.on('error', (err) => {console.log(err.message);});
    }

    private reconnect() {
        // Close the current connection if it exists
        if (this.client) {
            this.client.end();
            this.client.destroy();
        }
    
        // Create a new connection
        this.client = net.createConnection({ host: appConfig.controlDeviceHost, port: 8099 }, () => {
            console.log('vMix woke up and smelled the coffee!');
        });
    
        // Handle close event during reconnection
        this.client.once('close', () => {});
    
        // Handle errors during reconnection
        this.client.once('error', (error) => {
            console.error("vMix connection fail: ", error.message);
        });
    }

    public async sendAndReceiveData(dataToSend: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.client.writable) {
                reject();
                this.reconnect();
                return;
            }

            this.client.write(dataToSend);

            this.client.once('data', (data) => {
                resolve(data.toString());
            });
        });
    }
}

const tcpClient = new TcpClient();
export default tcpClient;
