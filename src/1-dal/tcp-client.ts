import net from 'net';
import appConfig from '../4-utils/app-config';

class TcpClient {

    private client: net.Socket;
    public online: boolean = false;

    constructor() {
        this.client = net.createConnection({ host: appConfig.controlDeviceHost, port: 8099 }, () => {
            this.online = true;
            console.log('Connected to vMix');
        });
        this.client.on('close', () => {
            this.online = false;
            console.log('Disconnected from the server. Try to reconnect...');
            this.reconnect();
        });
        this.client.on('error', (err) => {
            this.online = false;
            console.log(err.message);
        });
    }

    private reconnect(){
        this.client = net.createConnection({ host: appConfig.controlDeviceHost, port: 8099 }, () => {
            this.online = true;
            console.log('Connected to vMix');
        });
        this.client.on('close', () => {
            this.online = false;
            console.log('Disconnected from the server');
        });
        this.client.on('error', (err) => {
            this.online = false;
            console.log(err.message);
        });
    }

    public async sendAndReceiveData(dataToSend: string): Promise<string> {
        console.log("sendAndReceiveData()", "Client online: ", this.online)
        
        if(this.online){
            return new Promise((resolve, reject) => {
                if (!this.client.writable) {
                    reject();
                    console.log("offline. reconnect")
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
}

const tcpClient = new TcpClient();
export default tcpClient;
