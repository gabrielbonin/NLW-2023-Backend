import { FastifyInstance } from "fastify";
import { z } from "zod";

/**
 * GET - Buscar
 * POST - Salvar
 * PUT - Alterar
 * DELETE - Deletar
 * PATCH - Alteração específica
 */

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);
  });
}
