import * as fs from 'fs';
import path from 'path';

// -------------------- App configurations, that not saved in config.json file -----------------

const configPath = path.join(process.cwd(), 'config.json');


class AppConfig {

    clockPort = 7372;
    clockHost = '192.168.0.132';
    clock2Host = '192.168.0.23';
    clockMode = "Time mode";
    controlDevice = "tricaster";
    controlDeviceHost = "127.0.0.1";
    timecodeMode = "remaining";
    webServicePort = 4001;
    openConfigPageOnLoad = true;

    constructor() {
        // Load initial values from a file (if the file exists)
        this.loadFromFile(configPath);
    }

    private loadFromFile(filename: string): void {
        try {
            const data = fs.readFileSync(filename, 'utf-8');
            const config = JSON.parse(data);
            Object.assign(this, config);

        } catch (error) {
            console.error('Error loading config file:', error.message);
        }
    }

    private saveToFile(filename: string): void {
        const data = JSON.stringify(this, null, 2);
        fs.writeFileSync(filename, data, 'utf-8');
    }

    public getConfig() {
        try {
            return this;
        } catch (error) {
            console.error('Error loading config file:', error.message);
        }
    }

    public setConfig(config: {}){
        Object.assign(this, config);
        this.saveToFile(configPath);
    }

    get tricasterTimecodeURL() {
        return `http://${this.controlDeviceHost}/v1/dictionary?key=ddr_timecode`;
    }

    get tricasterTallyURL() {
        return `http://${this.controlDeviceHost}/v1/dictionary?key=tally`;
    }

    get tricasterTallyWSURL() {
        return `http://${this.controlDeviceHost}/v1/dictionary?key=tally`;
    }

}

const appConfig = new AppConfig();
export default appConfig;