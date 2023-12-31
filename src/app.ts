import express from "express";
import dataRoutes from "./6-routes/data-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import clockService from "./5-services/clock-service";
import path from "path";

//  Web server
const server = express();
server.use(express.json());

// Web UI 
server.use(express.static(path.join(__dirname, '..', 'web-page')));
server.get('/config', (req, res) => {
    const configFilePath = path.join(__dirname, '..', 'web-page', 'index.html');
    res.sendFile(configFilePath);
});

server.use("/api", dataRoutes);
server.use(routeNotFound);
server.use(catchAll);
server.listen(appConfig.webServicePort, () => {
    console.log("Listening on http://localhost:" + appConfig.webServicePort);
    console.log("Config webpage available on http://localhost:" + appConfig.webServicePort + '/config');
    }
);


clockService.manualMode();