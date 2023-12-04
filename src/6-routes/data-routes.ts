import express, { Request, Response, NextFunction } from "express";
import clockService from "../5-services/clock-service";
import path from "path";
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

// POST http://localhost:4001/api/set-uptimer
router.post("/set-uptimer", (request: Request, response: Response, next: NextFunction) => {
    try {
        clockService.upTimerMode();
        response.sendStatus(200);
    } catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4001/api/set-downtimer
router.post("/set-downtimer", (request: Request, response: Response, next: NextFunction) => {
    try {
        clockService.downTimerMode();
        response.sendStatus(200);
    } catch (err: any) {
        next(err);
    }
});

router.get('/config', (req: Request, res: Response) => {
    const configFilePath = path.join(__dirname, '..', '..', 'config.html');
    res.sendFile(configFilePath);
  });

// router.get('/status', (req: Request, res: Response) => {
//     const status = await clockService
// });
export default router;
