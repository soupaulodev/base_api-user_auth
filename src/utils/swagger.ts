import { info } from "console";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig = {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "IO Finance API",
      description: "Documentation for IO Finance API",
      version: process.env.npm_package_version || "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
};
