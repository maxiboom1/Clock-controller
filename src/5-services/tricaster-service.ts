import axios from "axios";
import appConfig from "../4-utils/app-config";
import timeConvertors from "../4-utils/timeConvertors";
const { parseString } = require('xml2js');

async function getTricasterTimecode() {
  const ddr = "ddr2";
  try {
    const response = await axios.get(appConfig.tricasterEmulatorURL);
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
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

// Export the function
export default {
  getTricasterTimecode
};
