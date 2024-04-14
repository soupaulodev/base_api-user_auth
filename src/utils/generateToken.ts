import { User } from "@prisma/client";
import { FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { FastifyCookie as cookie } from "@fastify/cookie";

const secret =
  process.env.JWT_SECRET || "CONFIGURE_YOUR_JWT_SECRET_TOKEN_ON_.ENV";

export const generateToken = (userId: User, reply: FastifyReply) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "15d",
  });

  reply.cookie("token", token, {
    httpOnly: true,
  });
};
