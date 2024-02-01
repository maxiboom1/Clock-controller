import net from 'net';
import appConfig from '../4-utils/app-config';

// vMix tcp client
class TcpClient {

    private client: net.Socket;
    public online: boolean = false;

    constructor() {
        this.client = new net.Socket();
        this.initiateConnection();
    }

    private initiateConnection() {
        this.client.removeAllListeners(); // Remove old listeners to prevent memory leaks
        this.client = net.createConnection({ host: appConfig.controlDeviceHost, port: 8099 }, () => {
            this.online = true;
            console.log('Connected to vMix');
        });
        this.client.once('close', () => {
            this.online = false;
            console.log('vMix is offline. Try to reconnect...');
            setTimeout(() => { this.initiateConnection(); }, 5000);
        });
        this.client.once('error', (err) => {
            this.online = false;
            console.log(err.message);
        });
    }

    public reconnect() {
        if (this.client) {
            this.client.end(() => {
                console.log('Connection to vMix gracefully closed.');
            });
            this.client.destroy(); // Ensures that the socket is fully closed
            this.online = false;
        }
        console.log("Reconnecting..");
        this.initiateConnection();
    }

    public async sendAndReceiveData(dataToSend: string): Promise<string> {
      
        if(this.online){
            return new Promise((resolve, reject) => {
                
                if (!this.client.writable) {
                    reject();
                    return;
                }

                this.client.write(dataToSend);
    
                this.client.once('data', (data) => {
                    resolve(data.toString());
                });
            });
        } else {
            return null;
        } 
    }

    get isOnline(){return this.online}
}

const tcpClient = new TcpClient();
export default tcpClient;
