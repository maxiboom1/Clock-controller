import axios from "axios";
import appConfig from "../4-utils/app-config";
const { parseString } = require('xml2js');

async function fetchDdrTimecode() {
  try {
    const response = await axios.get(appConfig.tricasterEmulatorURL);
    const xml = response.data;
    let jsonData: any;
    
    parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {throw new Error(err);}
        jsonData = result;
    });

    const clipSecondsRemaining = Math.floor(jsonData.timecode.ddr2['$'].clip_seconds_remaining);
    return clipSecondsRemaining;

  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

// Export the function
export default {
  fetchDdrTimecode
};
