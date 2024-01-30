import appConfig from "../4-utils/app-config";
import clockService from "../5-services/clock-service";

async function processConfigData(config: any){
    
    if(config.clockMode === "Controller mode"){
        clockService.manualMode();
    }
    
    if(config.clockMode === "Time mode"){
        clockService.timeMode();
    }
    
    appConfig.setConfig(config);
    
}

export default {
    processConfigData
}
