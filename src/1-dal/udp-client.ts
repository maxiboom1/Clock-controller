// import dgram, { Socket } from "dgram";
// import appConfig from "../4-utils/app-config";

// class UDPClient {
  
//   private socket: Socket;
//   private cleanupListeners!: () => void; // Declaration

//   constructor() {
//     this.socket = dgram.createSocket("udp4");
//     this.cleanupListeners = () => {}; // Initialization
//   }

//   public send(queryMessage: Buffer,clockAddr:string): Promise<Buffer> {
//     return new Promise<Buffer>((resolve, reject) => {
      
//       const onResponse = (msg: Buffer) => {
//         // Unsubscribe from listening for responses
//         this.cleanupListeners();
//         // Resolve the promise with the response
//         resolve(msg);
//       };

//       // Subscribe to listen for responses
//       this.socket.on("message", onResponse);

//       // Set a timeout for the request
//       const timeoutId = setTimeout(() => {
//         this.cleanupListeners();
//         reject(`Timeout: No response received from clock`);
//       }, appConfig.requestTimeout);

//       // Send the query message
//       this.sendMessage(queryMessage, appConfig.clockPort, clockAddr);
      
//       // Cleanup listeners function
//       this.cleanupListeners = () => {
//         clearTimeout(timeoutId);
//         this.socket.off("message", onResponse);
//       };
//     });
//   }

//   public close() {
//     this.socket.close();
//   }

//   private sendMessage(message: Buffer, port: number, address: string) {
//     this.socket.send(message, port, address, (error) => {
//       if (error) {
//         console.error(`Error sending data to ${address}:`, error);
//       }
//     });
//   }
// }

// const udpClient = new UDPClient();

// export default udpClient;


import dgram, { Socket } from "dgram";
import appConfig from "../4-utils/app-config";

class UDPClient {
  private socket: Socket;
  constructor() {
    this.socket = dgram.createSocket("udp4");
  }

  public send(queryMessage: Buffer, clockAddr: string): void {

    this.socket.send(queryMessage, 0, queryMessage.length, appConfig.clockPort, clockAddr, (error) => {
      if (error) {console.error(`Error sending data to ${clockAddr}:`, error);} 

    });
  } 

  public close(): void {
    this.socket.close();
  }

}

const udpClient = new UDPClient();

export default udpClient;