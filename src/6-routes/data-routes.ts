import express, { Request, Response, NextFunction } from "express";
import clockService from "../5-services/clock-service";
import path from "path";
import parseResponse from "../4-utils/parser";
const router = express.Router();

// POST http://localhost:4001/api/set-time-mode
router.post("/set-time-mode", (request: Request, response: Response, next: NextFunction) => {
    try {
        clockService.timeMode();
        response.sendStatus(200);
    } catch (err: any) {
        next(err);
    }
});


// POST http://localhost:4001/api/set-manual-mode
router.post("/set-manual-mode", (request: Request, response: Response, next: NextFunction) => {
    try {
        clockService.manualMode();
        response.sendStatus(200);
    } catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/config ==> Web config page
router.get('/config', (req: Request, res: Response) => {
    const configFilePath = path.join(__dirname, '..', '..', 'config.html');
    res.sendFile(configFilePath);
});

// GET http://localhost:4001/api/status 
router.get('/status', async(req: Request, res: Response) => {
    const status = await clockService.getClockStatus();
    res.status(201).json(status);
});


//TRICASTER EMULATOR - GET http://localhost:4001/api/tricaster
router.get('/tricaster', async (req: Request, res: Response) => {
    const xmlString = `
    <timecode>
    <ddr4 clip_seconds_elapsed="0" clip_seconds_remaining="25.992633" clip_embedded_timecode="0" clip_in="0" clip_out="25.992633" file_duration="26.026" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="25.992633" preset_index="0" clip_index="0" num_clips="1"/>
    <sound clip_seconds_elapsed="0" clip_seconds_remaining="268.4068" clip_embedded_timecode="0" clip_in="0" clip_out="268.4068" file_duration="268.4068" play_speed="1" clip_framerate="25" playlist_seconds_elapsed="0" playlist_seconds_remaining="268.401467" preset_index="0" clip_index="0" num_clips="1"/>
    <ddr1 clip_seconds_elapsed="488.554733" clip_seconds_remaining="175.3752" clip_embedded_timecode="32654.2444333" clip_in="0" clip_out="663.929933" file_duration="663.929933" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="488.554733" playlist_seconds_remaining="175.341833" preset_index="2" clip_index="1" num_clips="2"/>
    <ddr2 clip_seconds_elapsed="0" clip_seconds_remaining="45.011633" clip_embedded_timecode="0" clip_in="0" clip_out="45.011633" file_duration="45.011633" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="44.978267" preset_index="2" clip_index="21" num_clips="22"/>
    <ddr3 clip_seconds_elapsed="0" clip_seconds_remaining="1.968633" clip_embedded_timecode="0" clip_in="0" clip_out="1.968633" file_duration="1.968633" play_speed="1" clip_framerate="29.97003" playlist_seconds_elapsed="0" playlist_seconds_remaining="1.935267" preset_index="0" clip_index="0" num_clips="1"/>
    </timecode>
    `;

    // Set the Content-Type header to application/xml
    res.setHeader('Content-Type', 'application/xml');

    // Send the XML string in the response body
    res.status(201).send(xmlString);
});


export default router;
