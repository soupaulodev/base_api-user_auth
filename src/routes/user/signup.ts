import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { BadRequest } from "../_errors/bad-request";

export async function signup(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/signup",
    {
      schema: {
        summary: "Signup",
        tags: ["user"],
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
          confirmPassword: z.string().min(6),
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, confirmPassword } = request.body;
      const acessToken = request.cookies.access_token;

      if (acessToken) {
        throw new BadRequest("Already logged in");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (password !== confirmPassword) {
        throw new BadRequest("Passwords don't match");
      }

      if (user) {
        throw new BadRequest("Account already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { id } = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return reply.status(201).send({
        user: {
          id,
          name,
          email,
        },
      });
    }
  );
}
