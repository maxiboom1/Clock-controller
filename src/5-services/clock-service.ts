import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-operation";
import parseResponse from "../4-utils/parser";
import tricasterService from "./tricaster-service";
let resendInterval: NodeJS.Timeout | null = null;
import timeConvertors from "../4-utils/timeConvertors";
import getVmixTimecode from "./vmix-service";

function timeMode(): void {
    if (resendInterval) {clearInterval(resendInterval);resendInterval = null;}
    udpClient.send(Buffer.from(ClockOperation.SetTimeMode));
}

async function manualMode(): Promise<void> {
    
  if (resendInterval) {clearInterval(resendInterval);}
    
    udpClient.send(Buffer.from(ClockOperation.SetDownTimer));
    
    resendInterval = setInterval(async () => {
      const tricasterTc = await tricasterService.getTricasterTimecode();
      const vmixHSM = await getVmixTimecode();
      const tricasterTcHMS = timeConvertors.secondsToHMS(tricasterTc);
      udpClient.send(timeConvertors.timeStringToBytes(vmixHSM));

    }, 1000);

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
