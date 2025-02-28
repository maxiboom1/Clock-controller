import dgram, { Socket } from "dgram";
import appConfig from "../4-utils/app-config";

class UDPClient {
    private socket: Socket;
    constructor() {
        this.socket = dgram.createSocket("udp4");
    }

    public send(queryMessage: Buffer): void {
        this.sendUDP(queryMessage,appConfig.clockHost);
        this.sendUDP(queryMessage,appConfig.clock2Host);
    }
    
    private sendUDP(queryMessage: Buffer, clockAddr: string): void {
        this.socket.send(queryMessage, 0, queryMessage.length, appConfig.clockPort, clockAddr, (error) => {
            if (error) { console.error(`Error sending data to ${clockAddr}:`, error); }
        });

    }

    public close(): void {
        this.socket.close();
    }

}

const udpClient = new UDPClient();

export default udpClient;
