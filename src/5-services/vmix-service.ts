import tcpClient from "../1-dal/tcp-client";
import appConfig from "../4-utils/app-config";
import log from "../4-utils/debugger";
import timeConvertors from "../4-utils/timeConvertors";

async function getVmixTimecode(): Promise<string> {
    try {
        log("getVmixTimecode","vMix service");
        const input = appConfig.controllerInput
        const positionQuery = `XMLTEXT vmix/inputs/input[${input}]/@position\r\n`;
        const durationQuery = `XMLTEXT vmix/inputs/input[${input}]/@duration\r\n`;
        const positionData = await tcpClient.sendAndReceiveData(positionQuery);
        const durationData = await tcpClient.sendAndReceiveData(durationQuery);
        const position = Math.round( Number(positionData.split(" ")[2]) / 1000);
        const duration = Math.round( Number(durationData.split(" ")[2]) / 1000);
        const remaining = duration - position; 
        if(appConfig.timecodeMode === "remaining"){
            return timeConvertors.secondsToHMS(remaining);
        }
        if(appConfig.timecodeMode === "position"){
            return timeConvertors.secondsToHMS(position);
        }
    } catch (error) {
        return "00:00:00";
    }
}

export default getVmixTimecode;
