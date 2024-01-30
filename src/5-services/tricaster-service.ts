import axios from "axios";
import appConfig from "../4-utils/app-config";
import timeConvertors from "../4-utils/timeConvertors";
const { parseString } = require('xml2js');

async function getTricasterTimecode() {
  const ddr = appConfig.controllerInput.toLowerCase();
  
  try {
    const response = await axios.get(appConfig.tricasterTimecodeURL);
    const xml = response.data;
    let jsonData: any;
    parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {throw new Error(err);}
        jsonData = result;
    });

    const clipSecondsRemaining = Math.floor(jsonData.timecode[ddr]['$'].clip_seconds_remaining);
    const tricasterHMS = timeConvertors.secondsToHMS(clipSecondsRemaining);
    return tricasterHMS;

  } catch (error) {
    console.error(`Error fetching data from Tricaster:`, error.message);
  }
}

// Export the function
export default {
  getTricasterTimecode
};
