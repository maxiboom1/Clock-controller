import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-operation";
import timeConvertors from "../4-utils/timeConvertors";


async function setTimeMode(): Promise<void> {
    udpClient.send(Buffer.from(ClockOperation.SetTimeMode));
}

async function setManualMode(): Promise<void> { 
    sendCommandToClock(ClockOperation.SetDownTimer);
}

// Got HH:MM:SS string, converts it to byte array, and sends to clock. Example: 10:52:20
function sendHMSToClock(HHMMSS: string): void {
    try {
        udpClient.send(timeConvertors.timeStringToBytes(HHMMSS));
    } catch (error) {
        console.log(error);
    }
}

// Got num array, converts it to buffer and sends to clock. Example: [165, 1, 0]
function sendCommandToClock(byteArr: number[]): void {
    try {
        udpClient.send(Buffer.from(byteArr));
    } catch (error) {
        console.log(error);
    }

}


export default {
    setTimeMode,
    setManualMode
}
