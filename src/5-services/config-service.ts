import tcpClient from "../1-dal/tcp-client";
import appConfig from "../4-utils/app-config";
import log from "../4-utils/debugger";
import clockService from "../5-services/clock-service";

async function processConfigData(config: any){
    log("processConfigData started", "config-service");
    
    // If clock 2 is disabled, rest it (set to "time mode")
    if(!config.clock2Enabled){
        console.log("INFO: Clock 2 was disabled, setting it to Time Mode.")
        clockService.resetClock2();
    }

    if(config.clockMode === "Controller mode"){
        log("processConfigData, initial mode - controller", "config-service");
        clockService.manualMode();
    }
    
    if(config.clockMode === "Time mode"){
        log("processConfigData, initial mode - time mode", "config-service");
        clockService.timeMode();
    }

    if(tcpClient.isOnline && (config.controlDeviceHost !== appConfig.controlDeviceHost)){
        appConfig.setConfig(config);
        tcpClient.reconnect();
    } else {
        appConfig.setConfig(config);
    }
    
    
}

export default {
    processConfigData
}
