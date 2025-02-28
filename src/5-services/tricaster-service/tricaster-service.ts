import appConfig from "../../4-utils/app-config";
import axios from "axios";
const { parseString } = require('xml2js');

async function getTricasterTimecode() {

    const tcMode = appConfig.timecodeMode;
    const url = appConfig.tricasterTallyURL;
    const response = await axios.get(url);
    let jsonData: any;
    parseString(response.data, { explicitArray: false }, (err, result) => {
        if (err) { throw new Error(err); }
        jsonData = result.tally.column;
    });
    const onAir = getSourcesOnPgm(jsonData);
    if (onAir.includes("ddr1") || onAir.includes("ddr2")) {
        console.log(onAir);
    }
    return "00:00:00";
}

function getSourcesOnPgm(data: any) {
    const ddr1 = data.find(item => item['$'].name === 'ddr1');
    const ddr2 = data.find(item => item['$'].name === 'ddr2');
    let result = [];
    if (ddr1 && ddr1['$'].on_pgm === 'true') {
        result.push(ddr1['$'].name);
    }
    if (ddr2 && ddr2['$'].on_pgm === 'true') {
        result.push(ddr2['$'].name);
    }
    return result;
}


// Export the function
export default {
    getTricasterTimecode
};