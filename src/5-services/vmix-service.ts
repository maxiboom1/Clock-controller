import tcpClient from "../1-dal/tcp-client";
import appConfig from "../4-utils/app-config";
import timeConvertors from "../4-utils/timeConvertors";

async function getVmixTimecode(): Promise<string> {
    try {
        const input = appConfig.controllerInput

        const positionQuery = `XMLTEXT vmix/inputs/input[${input}]/@position\r\n`;
        const durationQuery = `XMLTEXT vmix/inputs/input[${input}]/@duration\r\n`;
        const positionData = await tcpClient.sendAndReceiveData(positionQuery);
        const durationData = await tcpClient.sendAndReceiveData(durationQuery);
        const position = Math.floor( Number(positionData.split(" ")[2]) / 1000);
        const duration = Math.floor( Number(durationData.split(" ")[2]) / 1000);
        const remaining = duration - position; 

        const timecodeHMS = timeConvertors.secondsToHMS(remaining);        

        return timecodeHMS;

    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}

export default getVmixTimecode;
