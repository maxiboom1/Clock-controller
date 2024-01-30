import express, { Request, Response, NextFunction } from "express";
import appConfig from "../4-utils/app-config";
const router = express.Router();

// POST http://localhost:4001/api/set-controller {controllerHost: 'localhost',controllerType: 'Tricaster',controllerInput: 'DDR3'}
router.post("/set-config", (request: Request, response: Response, next: NextFunction) => {
    console.log("set-controller", request.body);
    try {
        appConfig.setConfig(request.body);
    } catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/status 
router.get('/get-config', async(req: Request, res: Response) => {
    const result = appConfig.getConfig();
    res.status(201).json(result);
});

export default router;
