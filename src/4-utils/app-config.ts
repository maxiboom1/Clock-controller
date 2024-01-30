import * as fs from 'fs';
import path from 'path';

// Set this to "true" to hardcode controller host IP for security reasons, otherwise, set to "false".
const securityMode = true;
const controlDeviceHardcodedAddr = "10.232.41.205";

const configPath = path.join(process.cwd(), 'config.json');

class AppConfig {
    clockPort = 7372;
    clockHost = '192.168.0.132';
    clock2Host = '192.168.0.23';
    clock2Enabled = false;
    clockMode = "Time mode";
    controlDevice = "tricaster";
    controlDeviceHost = "127.0.0.1";
    timecodeMode = "remaining";
    controllerInput = "1";
    requestTimeout = 1000;
    webServicePort = 4001;

    constructor() {
        // Load initial values from a file (if the file exists)
        this.loadFromFile(configPath);
    }

    private loadFromFile(filename: string): void {
        try {
            const data = fs.readFileSync(filename, 'utf-8');
            const config = JSON.parse(data);
            Object.assign(this, config);
            
            // Hardcoded IP for security
            if (securityMode) {
                if(config.controlDeviceHost !== controlDeviceHardcodedAddr){
                    this.controlDeviceHost = controlDeviceHardcodedAddr;
                    this.securityMessage();
                }
            } 

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
        
        // Prevent changing controlDeviceHost in security mode
        if (securityMode && config.hasOwnProperty('controlDeviceHost')) {
            if(config['controlDeviceHost'] !== this.controlDeviceHost){
                this.securityMessage();
                delete config['controlDeviceHost']; 
            }
        };

        Object.assign(this, config);
        this.saveToFile(configPath);
    }

    get tricasterTimecodeURL() {
        const tcHost = securityMode ? controlDeviceHardcodedAddr : this.controlDeviceHost;
        return `http://${tcHost}/v1/dictionary?key=ddr_timecode`;
    }

    private securityMessage(){
        console.error('License service: Now allowed to change controller IP address. It will remain ' + controlDeviceHardcodedAddr);
    }
}

const appConfig = new AppConfig();

export default appConfig;
