import * as fs from 'fs';
import clockService from '../5-services/clock-service';
import path from 'path';

const configPath = path.join(process.cwd(), 'config.json');

class AppConfig {
    clockPort = 7372;
    clockHost = '192.168.0.132';
    clockMode = "Time mode";
    controlDevice = "tricaster";
    controlDeviceHost = "127.0.0.1";
    timecodeMode = "remaining";
    controllerInput = "1";
    requestTimeout = 1000;
    webServicePort = 4001;
    tricasterTimecodeURL = `http://${this.controlDeviceHost}/v1/dictionary?key=ddr_timecode`;
    tricasterEmulatorURL = `http://localhost:4001/api/tricaster`;

    constructor() {
        // Load initial values from a file (if the file exists)
        this.loadFromFile(configPath);
        console.log(this);
    }

    public setClockHost(hostAddr: string): void {
        this.clockHost = hostAddr;
        this.saveToFile(configPath);
    }

    public setClockMode(clockMode: string): void {
        this.clockMode = clockMode;
        this.saveToFile(configPath);
        if(clockMode === "Controller mode"){
            clockService.manualMode();
        }
        if(clockMode === "Time mode"){
            clockService.timeMode();
        }
    }

    public setControllerHost(hostAddr: string): void {
        this.controlDeviceHost = hostAddr;
        this.saveToFile(configPath);
    }

    public setControlDevice(controlDevice: string): void {
        this.controlDevice = controlDevice;
        this.saveToFile(configPath);
    }

    public setControllerInput(controllerInput: string): void {
        this.controllerInput = controllerInput;
        this.saveToFile(configPath);
    }

    public setTimecodeMode(timecodeMode: string): void {
        this.timecodeMode = timecodeMode;
        this.saveToFile(configPath);
    }

    private loadFromFile(filename: string): void {
        try {
            const data = fs.readFileSync(filename, 'utf-8');
            const config = JSON.parse(data);
            Object.assign(this, config);
        } catch (error) {
            // Handle file read error or JSON parse error
            console.error('Error loading config file:', error.message);
        }
    }

    private saveToFile(filename: string): void {
        const data = JSON.stringify(this, null, 2);
        fs.writeFileSync(filename, data, 'utf-8');
    }

    public getConfig() {
        try {
            const data = fs.readFileSync(configPath, 'utf-8');
            const config = JSON.parse(data);
            return config;
        } catch (error) {
            console.error('Error loading config file:', error.message);
        }
    }
}

const appConfig = new AppConfig();

export default appConfig;
