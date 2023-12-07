import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-oparation";
import parseResponse from "../4-utils/parser";
import tricasterService from "./tricaster-service";
let resendInterval: NodeJS.Timeout | null = null;

function timeMode(): void {
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    udpClient.send(Buffer.from(ClockOperation.SetTimeMode));
}

// This service should get TriCaster data, now it uses debug time-generator
async function manualMode(): Promise<void> {
    
  if (resendInterval) {clearInterval(resendInterval);}
    const tricasterTc = await tricasterService.fetchDdrTimecode();
    console.log(tricasterTc);
    udpClient.send(Buffer.from(ClockOperation.SetDownTimer));
    resendInterval = setInterval(() => {
       
      // here we work with tricaster service
      // ...
      // ...
      // ...
      
      //udpClient.send(timeStringToBytes(getCurrentTime()));
    }, 500);
}

async function getClockStatus(){
    const status = await udpClient.send(Buffer.from([0xA1, 0x04, 0xB2]));
    const statusString = status.toString('hex'); 
    const statusObj = parseResponse(statusString);
    return statusObj;
}

export default {
  timeMode,
  manualMode,
  getClockStatus
}
