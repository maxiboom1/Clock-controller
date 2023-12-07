import tcpClient from "../1-dal/tcp-client";
import timeConvertors from "../4-utils/timeConvertors";

async function getVmixTimecode(): Promise<string> {
    try {
        const dataToSend = `XMLTEXT vmix/inputs/input[1]/@position\r\n`;
        const response = await tcpClient.sendAndReceiveData(dataToSend);

        // Explicitly cast response to a string
        const responseStr = response as string;

        // Split the response by spaces
        const responseArr = responseStr.split(" ");
        
        // @ts-ignore
        const seconds = Math.floor(Number(responseArr[2]) / 1000);

        const timecodeHMS = timeConvertors.secondsToHMS(seconds);        

        return timecodeHMS;

    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}

export default getVmixTimecode;
