import fastify from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";

import routes from "../routes/routes.js";

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
});

app.register(helmet);
app.register(routes);

if (require.main === module) {
  const start = async () => {
    try {
      await app.listen(3000, "0.0.0.0");
      console.log("Servidor rodando na porta 3000");
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  start();
}

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
