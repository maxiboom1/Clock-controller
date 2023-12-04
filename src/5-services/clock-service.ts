import udpClient from "../1-dal/udp-client";
import ClockOperation from "../2-models/clock-oparation";


function timeMode(): void {
    udpClient.send(Buffer.from([ClockOperation.SetTimeMode]));
}

function upTimerMode():void{
    udpClient.send(Buffer.from([ClockOperation.SetUpTimer]));
}

function downTimerMode(): void{
    udpClient.send(Buffer.from([ClockOperation.SetDownTimer]));
}

export default {
  timeMode,
  upTimerMode,
  downTimerMode
};