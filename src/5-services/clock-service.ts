import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-oparation";
import getCurrentTime from "../4-utils/time-gen";
import timeStringToBytes from "../4-utils/time-to-bytes";

let resendInterval: NodeJS.Timeout | null = null;

function timeMode(): void {
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    udpClient.send(Buffer.from(ClockOperation.SetTimeMode));
}

// This service should get TriCaster data, now it uses debug time-generator
function manualMode(): void {
    
  if (resendInterval) {clearInterval(resendInterval);}
    udpClient.send(Buffer.from(ClockOperation.SetDownTimer));

    resendInterval = setInterval(() => {
       
      // here will be the logic for the tricaster data
      // ...
      // ...
      // ...
      
      //udpClient.send(timeStringToBytes(getCurrentTime()));
    }, 500);
}

async function getClockStatus(){
    const status = await udpClient.send(Buffer.from([0xA1, 0x04, 0xB2]));
    const statusString = status.toString('hex'); // Convert the Buffer to a hexadecimal string
    return statusString;
}

export default {
  timeMode,
  manualMode,
  getClockStatus
}
