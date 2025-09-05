import test from "node:test";
import assert from "node:assert";
import { fetchTrendingModels } from "../src/models/trendingModels";
import { AIBOMGenerator } from "../src/aibom/generator";

test("Generate something", async () => {
  const trendingModels = await fetchTrendingModels();
  const aibomGenerator = new AIBOMGenerator();
  const aibom = aibomGenerator.generateAIBOM(trendingModels.pop());

  const expected = "facebook/contriever";
  assert.equal(expected, aibom.metadata.component.name);
});

