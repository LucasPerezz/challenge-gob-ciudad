import { createSwaggerSpec } from "next-swagger-doc";
import { OpenAPIV3 } from "openapi-types";

export const getApiDocs = async (): Promise<OpenAPIV3.Document> => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api/v1",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0",
        description: "API Documentation sobre challenge de ingreso para el puesto de desarrollador fullstack en el gobierno de la ciudad.",
      },
      paths: {
        '/api/v1/employees/{id}': { get: {}, put: {}, delete: {} },
        '/api/v1/employees': { get: {}, post: {} },
      },
    },
  }) as OpenAPIV3.Document;

  return spec;
};
