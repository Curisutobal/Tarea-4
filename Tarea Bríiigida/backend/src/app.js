import express from "express";
import cors from "cors";
import { CommuneRoute } from "./commune/route.js";
import { IndicatorRoute } from "./indicators/route.js";

console.log("Importó IndicatorRoute:", IndicatorRoute);

console.log("app.js arrancó");


const app = express();
app.get("/test", (req, res) => res.send("FUNCIONA"));
app.use(express.json());
app.use(cors());
app.use("/commune/", CommuneRoute.route);
app.use("/indicators/", IndicatorRoute.route);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is on in http://localhost:${PORT}`));








