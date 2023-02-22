import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./lib/routes";
import { notificationRoutes } from "./lib/notifications-routes";

const app = Fastify();
app.register(cors);
app.register(appRoutes);
app.register(notificationRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server is running on PORT 3333");
  });
