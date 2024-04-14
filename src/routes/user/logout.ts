import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function logout(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/logout",
    {
      schema: {
        summary: "Logout",
        tags: ["user"],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [app.authenticate],
    },
    async (request, reply) => {
      reply.clearCookie("access_token");
      return reply.send({ message: "Logout successful" });
    }
  );
}
