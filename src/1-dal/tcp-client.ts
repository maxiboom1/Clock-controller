import net from 'net';

class TcpClient {

    private client: net.Socket;
    
    constructor() {
        this.client = net.createConnection({ host: "127.0.0.1", port: 8099 }, () => {
        console.log('Connected to the server');
    });

    this.client.on('end', () => {console.log('Disconnected from the server');});

    this.client.on('error', (err) => {console.error('Error:', err.message);});
  
    }

    sendAndReceiveData(dataToSend: string) {
        return new Promise((resolve, reject) => {
            this.client.write(dataToSend);

            // Handle the response
            this.client.once('data', (data) => {
                resolve(data.toString());
            });

            // Handle errors
            this.client.once('error', (err) => {
                reject(err);
            });
        });
  }
}

const tcpClient = new TcpClient();
export default tcpClient;
