import { FastifyReply, FastifyRequest, fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { signup } from "./routes/user/signup";
import { login } from "./routes/user/login";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { logout } from "./routes/user/logout";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./utils/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { errorhandler } from "./error-handler";

const ENVIROMENT = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT || 3333);
const HOST = ENVIROMENT === "production" ? "0.0.0.0" : "127.0.0.1";
const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
const C_SECRET = process.env.COOKIE_SECRET || "COOKIE_SECRET";

const app = fastify();

app.register(fastifySwagger, swaggerConfig);
app.register(fastifySwaggerUi, {
  routePrefix: "/api/docs",
});

app.register(fjwt, { secret: JWT_SECRET });
app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

app.register(fCookie, {
  secret: C_SECRET,
  hook: "preHandler",
});

app.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;
    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
    }

    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(signup, { prefix: "/api/users" });
app.register(login, { prefix: "/api/users" });
app.register(logout, { prefix: "/api/users" });

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

app.setErrorHandler(errorhandler);

app
  .listen({ port: PORT, host: HOST })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
