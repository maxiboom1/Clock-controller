import WebSocket from 'ws';
import EventEmitter from 'events';
import appConfig from "../../4-utils/app-config";

class TallyService extends EventEmitter {
    private ws: WebSocket | null = null;

    constructor() {
        super();
    }

    connect() {
        this.ws = new WebSocket(appConfig.tricasterTallyWSURL);
        this.ws.on('message', (data) => {
            this.handleMessage(data);
        });
    }

    handleMessage(data: WebSocket.RawData) {
        const jsonData = JSON.parse(data.toString());
        if(jsonData === "tally") {
            this.emit('tallyChange');
        }
    }

}

export default new TallyService();
