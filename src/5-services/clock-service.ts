import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-operation";
import parseResponse from "../4-utils/parser";
import tricasterService from "./tricaster-service";
import timeConvertors from "../4-utils/timeConvertors";
import getVmixTimecode from "./vmix-service";
import appConfig from "../4-utils/app-config";

let resendInterval: NodeJS.Timeout | null = null;

function timeMode(): void {
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    udpClient.send(Buffer.from(ClockOperation.SetTimeMode));
}

async function manualMode(): Promise<void> {

  if (resendInterval) {clearInterval(resendInterval);}
    sendBufferToClock(ClockOperation.SetDownTimer);
    
    resendInterval = setInterval(async () => {
      switch(appConfig.controlDevice){
        case "Tricaster": 
          const tricasterHMS = await tricasterService.getTricasterTimecode(); // Returns HHMMSS
          if(tricasterHMS !== undefined){
            await sendHMSToClock(tricasterHMS);
          }
          break;
        case "vMix":
          const vmixHMS = await getVmixTimecode(); // Return HHMMSS
          await sendHMSToClock(vmixHMS);
          break;
      }

    }, 1000);

}

async function getClockStatus(){
  try {
    const status = await sendBufferToClock(ClockOperation.GetClockStatus);
    const statusString = status.toString('hex'); 
    const statusObj = parseResponse(statusString);
    return statusObj;
  } catch (error) {
    console.log(error);
  }  

}

// Got HH:MM:SS string, converts it to byte array, and sends to clock. Example: 10:52:20
async function sendHMSToClock(HHMMSS:string): Promise<void> {
  try {
    await udpClient.send(timeConvertors.timeStringToBytes(HHMMSS));
  } catch (error) {
    console.log(error);
  }
}

// Got num array, converts it to buffer and sends to clock. Example: [165, 1, 0]
async function sendBufferToClock(byteArr: number[]): Promise<Buffer> {
  try {
    const result = await udpClient.send(Buffer.from(byteArr));
    return result;
  } catch (error) {
    console.log(error);
  }

}


export default {
  timeMode,
  manualMode,
  getClockStatus
}
