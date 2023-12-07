class AppConfig {
    
    clockPort= 7372;
    
    clockHost= '192.168.0.132';

    controlDevice = "tricaster";

    controlDeviceHost = "127.0.0.1";
    
    webServicePort = 4001;

    tricasterTimecodeURL = `http://${this.controlDeviceHost}/v1/dictionary?key=ddr_timecode`;

    tricasterEmulatorURL = `http://localhost:4001/api/tricaster`;

    setClockHost(hostAddr: string):void {
        this.clockHost = hostAddr;
    }

    setControlDevice(controlDevice: string):void {
        this.controlDevice = controlDevice;
    }

}

const appConfig = new AppConfig();

export default appConfig;
