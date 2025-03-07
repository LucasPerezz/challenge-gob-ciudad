import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";
import { OpenAPIV3 } from "openapi-types";

export default async function IndexPage() {
  const spec: OpenAPIV3.Document = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
