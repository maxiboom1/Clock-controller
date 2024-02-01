import axios from "axios";
import appConfig from "../4-utils/app-config";
import timeConvertors from "../4-utils/timeConvertors";
import log from "../4-utils/debugger";
const { parseString } = require('xml2js');

async function getTricasterTimecode() {
  const ddr = appConfig.controllerInput.toLowerCase();
  const debugMode = appConfig.debugMode;
  const tcMode = appConfig.timecodeMode;
  const url = debugMode ? "http://localhost:4001/api/emulator" : appConfig.tricasterTimecodeURL;
  try {
    const response = await axios.get(url);
    const xml = response.data;
    let jsonData: any;
    parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {throw new Error(err);}
        jsonData = result;
    });

    if(tcMode === "remaining"){
      const clipSecondsRemaining = Math.floor(jsonData.timecode[ddr]['$'].clip_seconds_remaining);
      const tricasterHMS = timeConvertors.secondsToHMS(clipSecondsRemaining);
      log(`${tricasterHMS} remaining (${ddr})`, "tricaster-service");
      return tricasterHMS;
    }

    if(tcMode === "position"){
      const clipSecondsElapsed = Math.floor(jsonData.timecode[ddr]['$'].clip_seconds_elapsed);
      const tricasterHMS = timeConvertors.secondsToHMS(clipSecondsElapsed);
      log(`${tricasterHMS} elapsed (${ddr})`, "tricaster-service");
      return tricasterHMS;
    }


  } catch (error) {
    console.error(`Error fetching data from Tricaster:`, error.message);
  }
}

// Export the function
export default {
  getTricasterTimecode
};


/*
<timecode>
<ddr4 clip_seconds_elapsed="0" clip_seconds_remaining="25.992633" clip_embedded_timecode="0" clip_in="0" clip_out="25.992633" file_duration="26.026" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="25.992633" preset_index="0" clip_index="0" num_clips="1"/>
<ddr2 clip_seconds_elapsed="0" clip_seconds_remaining="59.977347" clip_embedded_timecode="0" clip_in="0" clip_out="59.977347" file_duration="120.053267" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="59.993267" preset_index="0" clip_index="0" num_clips="4"/>
<sound clip_seconds_elapsed="0" clip_seconds_remaining="268.4068" clip_embedded_timecode="0" clip_in="0" clip_out="268.4068" file_duration="268.4068" play_speed="1" clip_framerate="25" playlist_seconds_elapsed="0" playlist_seconds_remaining="268.401467" preset_index="0" clip_index="0" num_clips="1"/>
<ddr3 clip_seconds_elapsed="0" clip_seconds_remaining="1.968633" clip_embedded_timecode="0" clip_in="0" clip_out="1.968633" file_duration="1.968633" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="1.935267" preset_index="0" clip_index="0" num_clips="1"/>
<ddr1 clip_seconds_elapsed="0" clip_seconds_remaining="3.486309" clip_embedded_timecode="0" clip_in="0" clip_out="3.486309" file_duration="234.801233" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="3.470133" preset_index="2" clip_index="1" num_clips="3"/>
</timecode>
*/