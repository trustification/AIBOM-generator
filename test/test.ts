import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fetchTrendingModels } from '../src/models/trendingModels';
import { AIBOMGenerator } from '../src/aibom/generator';

test('Generate something', async () => {
  const trendingModels = await fetchTrendingModels();
  const aibomGenerator = new AIBOMGenerator();
  const aibom = aibomGenerator.generateAIBOM(trendingModels.pop());

  const expected = 'CycloneDX';
  assert.equal(aibom.bomFormat, expected);
});

test('Saves a temp file in generated_aiboms', () => {
  const aibomGenerator = new AIBOMGenerator();
  aibomGenerator.saveAIBOM({ bomFormat: 'CycloneDX' }, 'aibom_test.json');

  const saved = path.join(process.cwd(), 'generated_aiboms', 'aibom_test.json');
  assert.ok(fs.existsSync(saved));
  fs.unlinkSync(saved);
});
