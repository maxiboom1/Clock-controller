import appConfig from "./app-config";

function log(msg: string, service: string){
    
    if(appConfig.debugMode){
        console.log('DEBUG:',`${service}: ${msg}`);
    }
    
}

export default log;