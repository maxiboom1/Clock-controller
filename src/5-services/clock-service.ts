import ClockService from "../1-dal/udp-client";
import parseResponse from "../4-utils/parser";

const udpInit = async () => {
    const clockService = ClockService.getInstance();
    const queryMessage = Buffer.from([0xA1, 0x04, 0xB2]);
    clockService.sendQueryAndHandleResponse(queryMessage, (response) => {
        console.log("Received response:", response.toString("hex"));
        console.log(parseResponse(response.toString("hex")));
    });

};

export default udpInit;