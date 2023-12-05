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
    res.status(201).json(parseResponse(status));
});


export default router;
