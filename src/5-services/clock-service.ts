import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-operation";
import tricasterService from "./tricaster-service";
import timeConvertors from "../4-utils/timeConvertors";
import appConfig from "../4-utils/app-config";
import log from "../4-utils/debugger";

let resendInterval: NodeJS.Timeout | null = null;

async function timeMode(): Promise<void> {
    
  if (resendInterval) {
    clearInterval(resendInterval);resendInterval = null;
  }
  udpClient.send(Buffer.from(ClockOperation.SetTimeMode), appConfig.clockHost);
  udpClient.send(Buffer.from(ClockOperation.SetTimeMode), appConfig.clock2Host);

}

async function manualMode(): Promise<void> {

  if (resendInterval) {clearInterval(resendInterval);}
    sendBufferToClock(ClockOperation.SetDownTimer);
    resendInterval = setInterval(async () => {
      const tricasterHMS = await tricasterService.getTricasterTimecode(); 
      if(tricasterHMS !== undefined){
        sendHMSToClock(tricasterHMS);
      }   
    }, 500);

}

// Got HH:MM:SS string, converts it to byte array, and sends to clock. Example: 10:52:20
function sendHMSToClock(HHMMSS:string): void {
  try {
    //log(`sending ${HHMMSS} to clock`, "clock-service");
    udpClient.send(timeConvertors.timeStringToBytes(HHMMSS), appConfig.clockHost);
    udpClient.send(timeConvertors.timeStringToBytes(HHMMSS), appConfig.clock2Host);
  } catch (error) {
    console.log(error);
  }
}

// Got num array, converts it to buffer and sends to clock. Example: [165, 1, 0]
function sendBufferToClock(byteArr: number[]): void {
  try {
    udpClient.send(Buffer.from(byteArr), appConfig.clockHost);
    udpClient.send(Buffer.from(byteArr), appConfig.clock2Host);
  } catch (error) {
    console.log(error);
  }

}


export default {
  timeMode,
  manualMode
}
