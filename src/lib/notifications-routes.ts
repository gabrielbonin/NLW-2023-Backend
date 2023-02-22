import { FastifyInstance } from "fastify";
import WebPush from "web-push";

import { z } from "zod";

const keys = {
  publicKey:
    "BMshgudhdUK04oyLNA_HYXNHtNF13M4m-x-YWv1O897mm8_E1sAh_koEYUfAWll3x-NTP1eBm02H0Rnf3DZWZEM",
  privateKey: "-llxiY0Ss1FPRxm1YqHmqzynueE-NuobszIklvPDzHM",
};

WebPush.setVapidDetails(
  "http://localhost:3333",
  keys.publicKey,
  keys.privateKey
);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey: keys.publicKey,
    };
  });

  app.post("/push/register", () => {
    return {
      publicKey: keys.publicKey,
    };
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "Hello World");
    }, 5000);

    return reply.status(201).send();
  });
}
