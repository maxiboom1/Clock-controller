import express, { Request, Response, NextFunction } from "express";
import appConfig from "../4-utils/app-config";
import configService from "../5-services/config-service";
const router = express.Router();

// POST http://localhost:4001/api/set-controller {controllerHost: 'localhost',controllerType: 'Tricaster',controllerInput: 'DDR3'}
router.post("/set-config", (request: Request, response: Response, next: NextFunction) => {
    console.log("set-config", request.body);
    try {
        configService.processConfigData(request.body);
        
    } catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/status 
router.get('/get-config', async(req: Request, res: Response) => {
    const result = appConfig.getConfig();
    res.status(201).json(result);
});


//TRICASTER EMULATOR - GET http://localhost:4001/api/tricaster
router.get('/emulator', async (req: Request, res: Response) => {
    const random = Math.random() * 100000;
    const xmlString = `
    <timecode>
    <ddr4 clip_seconds_elapsed="0" clip_seconds_remaining="25.992633" clip_embedded_timecode="0" clip_in="0" clip_out="25.992633" file_duration="26.026" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="25.992633" preset_index="0" clip_index="0" num_clips="1"/>
    <sound clip_seconds_elapsed="0" clip_seconds_remaining="268.4068" clip_embedded_timecode="0" clip_in="0" clip_out="268.4068" file_duration="268.4068" play_speed="1" clip_framerate="25" playlist_seconds_elapsed="0" playlist_seconds_remaining="268.401467" preset_index="0" clip_index="0" num_clips="1"/>
    <ddr1 clip_seconds_elapsed="488.554733" clip_seconds_remaining="175.3752" clip_embedded_timecode="32654.2444333" clip_in="0" clip_out="663.929933" file_duration="663.929933" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="488.554733" playlist_seconds_remaining="175.341833" preset_index="2" clip_index="1" num_clips="2"/>
    <ddr2 clip_seconds_elapsed="53.21" clip_seconds_remaining="${random}" clip_embedded_timecode="0" clip_in="0" clip_out="45.011633" file_duration="45.011633" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="44.978267" preset_index="2" clip_index="21" num_clips="22"/>
    <ddr3 clip_seconds_elapsed="0" clip_seconds_remaining="1.968633" clip_embedded_timecode="0" clip_in="0" clip_out="1.968633" file_duration="1.968633" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="1.935267" preset_index="0" clip_index="0" num_clips="1"/>
    </timecode>
    `;
    // Set the Content-Type header to application/xml
    res.setHeader('Content-Type', 'application/xml');
    // Send the XML string in the response body
    res.status(201).send(xmlString);
});
export default router;
