import { validateCycloneDX } from "../validation/cyclonedx-validator";
import exampleBom from "../../generated_aiboms/aibom_openai_gpt-oss-20b.json";

describe("CycloneDX Compliance", () => {
  it("should validate generated BOM against CycloneDX v1.6 schema", () => {
    const result = validateCycloneDX(exampleBom);
    expect(result.valid).toBe(true);
    if (!result.valid) {
      console.error(result.errors);
    }
  });
});