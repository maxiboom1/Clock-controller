import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-operation";
import parseResponse from "../4-utils/parser";
import tricasterService from "./tricaster-service";
import timeConvertors from "../4-utils/timeConvertors";
import getVmixTimecode from "./vmix-service";
import appConfig from "../4-utils/app-config";
import log from "../4-utils/debugger";

let resendInterval: NodeJS.Timeout | null = null;

async function timeMode(): Promise<void> {
    log(`timeMode() triggered`, "clock-service");
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    log(`timeMode(): Sending cmd to clock ${appConfig.clockHost}`, "clock-service");
    udpClient.send(Buffer.from(ClockOperation.SetTimeMode), appConfig.clockHost);
    log(`timeMode(): Sending cmd to clock ${appConfig.clockHost} - done`, "clock-service");
    if(appConfig.clock2Enabled){
      udpClient.send(Buffer.from(ClockOperation.SetTimeMode), appConfig.clock2Host);
    }
}

async function manualMode(): Promise<void> {

  if (resendInterval) {clearInterval(resendInterval);}
    sendBufferToClock(ClockOperation.SetDownTimer);
    
    resendInterval = setInterval(async () => {
      switch(appConfig.controlDevice){
        case "Tricaster": 
          log("getTricasterTimecode ","clock-service manualMode()")
          const tricasterHMS = await tricasterService.getTricasterTimecode(); // Returns HHMMSS
          if(tricasterHMS !== undefined){
            sendHMSToClock(tricasterHMS);
          }
          break;
        case "vMix":
          const vmixHMS = await getVmixTimecode(); // Return HHMMSS
          sendHMSToClock(vmixHMS);
          break;
      }

    }, 500);

}

// Got HH:MM:SS string, converts it to byte array, and sends to clock. Example: 10:52:20
function sendHMSToClock(HHMMSS:string): void {
  try {
    udpClient.send(timeConvertors.timeStringToBytes(HHMMSS), appConfig.clockHost);
    if(appConfig.clock2Enabled){
      udpClient.send(timeConvertors.timeStringToBytes(HHMMSS), appConfig.clock2Host);
    }
  } catch (error) {
    console.log(error);
  }
}

// Got num array, converts it to buffer and sends to clock. Example: [165, 1, 0]
function sendBufferToClock(byteArr: number[]): void {
  try {
    udpClient.send(Buffer.from(byteArr), appConfig.clockHost);
    if(appConfig.clock2Enabled){
      udpClient.send(Buffer.from(byteArr), appConfig.clock2Host);
    }
  } catch (error) {
    console.log(error);
  }

}

function resetClock2(){
  udpClient.send(Buffer.from(ClockOperation.SetTimeMode), appConfig.clock2Host);
}

export default {
  timeMode,
  manualMode,
  resetClock2
}


// Currently, its not in use
// async function getClockStatus(){
//   try {
//     const status = await sendBufferToClock(ClockOperation.GetClockStatus);
//     const statusString = status.toString('hex'); 
//     const statusObj = parseResponse(statusString);
//     return statusObj;
//   } catch (error) {
//     console.log(error);
//   }  

// }