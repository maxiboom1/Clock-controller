import appConfig from "../4-utils/app-config";
import log from "../4-utils/debugger";
import clockService from "../5-services/clock-service";

async function appProcessor(config: any){

    if(config.clockMode === "Controller mode"){
        log("appProcessor, initial mode - controller", "config-service");
        clockService.manualMode();
    }
    
    if(config.clockMode === "Time mode"){
        log("appProcessor, initial mode - time mode", "config-service");
        clockService.timeMode();
    }

    appConfig.setConfig(config);

}

export default {
    appProcessor
}
