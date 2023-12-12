// import dgram, { Socket } from "dgram";
// import appConfig from "../4-utils/app-config";

// class UDPClient {
//   private socket: Socket;

//   constructor() {
//     this.socket = dgram.createSocket("udp4");
//   }

//   public send(queryMessage: Buffer): Promise<Buffer> {
//     return new Promise<Buffer>((resolve) => {
//       const onResponse = (msg: Buffer) => {
//         // Unsubscribe from listening for responses
//         this.socket.off("message", onResponse);
//         // Resolve the promise with the response
//         resolve(msg);
//       };

//       // Subscribe to listen for responses
//       this.socket.on("message", onResponse);

//       // Send the query message
//       this.sendMessage(queryMessage, appConfig.clockPort, appConfig.clockHost);
//     });
//   }

//   public close() {
//     this.socket.close();
//   }

//   private sendMessage(message: Buffer, port: number, address: string) {
//     this.socket.send(message, port, address, (error) => {
//       if (error) {
//         console.error("Error sending message:", error);
//       }
//     });
//   }

//   private sendQueryAndHandleResponse(
//     queryMessage: Buffer,
//     port: number,
//     address: string,
//     callback: (response: Buffer) => void
//   ) {
//     const onResponse = (msg: Buffer) => {
//       // Handle the response here
//       callback(msg);
//       // Unsubscribe from listening for responses
//       this.socket.off("message", onResponse);
//     };

//     // Subscribe to listen for responses
//     this.socket.on("message", onResponse);

//     // Send the query message
//     this.sendMessage(queryMessage, port, address);
//   }
// }

// const udpClient = new UDPClient();

// export default udpClient;


import dgram, { Socket } from "dgram";
import appConfig from "../4-utils/app-config";

class UDPClient {
  private socket: Socket;

  private cleanupListeners!: () => void; // Declaration

  constructor() {
    this.socket = dgram.createSocket("udp4");
    this.cleanupListeners = () => {}; // Initialization
  }

  public send(queryMessage: Buffer): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const onResponse = (msg: Buffer) => {
        // Unsubscribe from listening for responses
        this.cleanupListeners();
        // Resolve the promise with the response
        resolve(msg);
      };

      // Subscribe to listen for responses
      this.socket.on("message", onResponse);

      // Set a timeout for the request
      const timeoutId = setTimeout(() => {
        this.cleanupListeners();
        reject(new Error("Timeout: No response received."));
      }, appConfig.requestTimeout);

      // Send the query message
      this.sendMessage(queryMessage, appConfig.clockPort, appConfig.clockHost);

      // Cleanup listeners function
      this.cleanupListeners = () => {
        clearTimeout(timeoutId);
        this.socket.off("message", onResponse);
      };
    });
  }

  public close() {
    this.socket.close();
  }

  private sendMessage(message: Buffer, port: number, address: string) {
    this.socket.send(message, port, address, (error) => {
      if (error) {
        console.error("Error sending message:", error);
      }
    });
  }
}

const udpClient = new UDPClient();

export default udpClient;
