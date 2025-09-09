import { fetchTrendingModels } from './models/trendingModels';
import { AIBOMGenerator } from './aibom/generator';

async function main() {
  try {
    const trendingModels = await fetchTrendingModels();
    const aibomGenerator = new AIBOMGenerator();

    for (const model of trendingModels) {
      const aibom = aibomGenerator.generateAIBOM(model);
      console.log(`Generated AIBOM for model: ${model.name}`);
      // Save the AIBOM to a file
      aibomGenerator.saveAIBOM(aibom, `aibom_${model.name}.json`);
    }
  } catch (error) {
    console.error('Error generating AIBOMs:', error);
  }
}

main();
