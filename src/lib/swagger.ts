import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api/v1",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0",
      },
    },
  });

  return spec;
};
