// clock-service.ts

import dgram, { Socket } from "dgram";
import appConfig from "../4-utils/app-config";

class ClockService {
  private static instance: ClockService;
  private udpClient: UDPClient;

  private constructor() {
    this.udpClient = new UDPClient();
    this.setupShutdownHandler();
  }

  public static getInstance(): ClockService {
    if (!ClockService.instance) {
      ClockService.instance = new ClockService();
    }
    return ClockService.instance;
  }

  private setupShutdownHandler() {
    process.on("SIGINT", () => {
      this.udpClient.close();
      process.exit();
    });
  }

  // Method to send a query and handle the response
  public sendQueryAndHandleResponse(queryMessage: Buffer, callback: (response: Buffer) => void) {
    this.udpClient.sendQueryAndHandleResponse(queryMessage, appConfig.clockPort, appConfig.clockHost, callback);
  }

  // Getter for UDPClient
  public getUDPClient(): UDPClient {
    return this.udpClient;
  }
}

class UDPClient {
  private socket: Socket;

  constructor() {
    this.socket = dgram.createSocket("udp4");
  }

  sendMessage(message: Buffer, port: number, address: string) {
    this.socket.send(message, port, address, (error) => {
      if (error) {
        console.error("Error sending message:", error);
      }
    });
  }

  // Method to send a query and handle the response
  sendQueryAndHandleResponse(
    queryMessage: Buffer,
    port: number,
    address: string,
    callback: (response: Buffer) => void
  ) {
    const onResponse = (msg: Buffer) => {
      // Handle the response here
      callback(msg);
      // Unsubscribe from listening for responses
      this.socket.off("message", onResponse);
    };

    // Subscribe to listen for responses
    this.socket.on("message", onResponse);

    // Send the query message
    this.sendMessage(queryMessage, port, address);
  }

  close() {
    this.socket.close();
  }
}

export default ClockService;
