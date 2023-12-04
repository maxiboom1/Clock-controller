import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-oparation";
import getCurrentTime from "../4-utils/time-gen";
import timeStringToBytes from "../4-utils/time-to-bytes";

let resendInterval: NodeJS.Timeout | null = null;

function timeMode(): void {
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    udpClient.send(Buffer.from([ClockOperation.SetTimeMode]));
}

function upTimerMode(): void {
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    udpClient.send(Buffer.from([ClockOperation.SetUpTimer]));
}
// This service should get TriCaster data, now it uses debug time-generator
function downTimerMode(): void {
    if (resendInterval) {clearInterval(resendInterval);}
    udpClient.send(timeStringToBytes(getCurrentTime()));

    resendInterval = setInterval(() => {
       
      // here will be the logic for the tricaster data
      // ...
      // ...
      // ...
      
      udpClient.send(timeStringToBytes(getCurrentTime()));
    }, 500);
}

async function getClockStatus(){
    console.log(ClockOperation.GetStatus);
  //const status = udpClient.send(Buffer.from(ClockOperation.GetStatus))
}

export default {
  timeMode,
  upTimerMode,
  downTimerMode
}
