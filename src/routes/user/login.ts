import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { BadRequest } from "../_errors/bad-request";

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        summary: "Login",
        tags: ["user"],
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            accessToken: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const acessToken = request.cookies.access_token;

      if (acessToken) {
        throw new BadRequest("Already logged in");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );

      if (!user || !isPasswordCorrect) {
        throw new BadRequest("Email or password incorrect");
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const token = request.jwt.sign(payload);

      reply.status(200).setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return;
    }
  );
}
