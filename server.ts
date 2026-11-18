import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const allowedOrigin = process.env.CORS_ORIGIN ?? "*";

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: allowedOrigin === "*" ? true : allowedOrigin.split(",") }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "Social Platform API",
    version: "0.1.0",
    status: "foundation",
    docs: "API documentation will be added in a later version."
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "social-platform-api",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "NOT_FOUND", message: "Ruta no encontrada." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Social Platform API listening on port ${port}`);
});
