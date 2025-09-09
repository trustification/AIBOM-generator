import fs from 'node:fs';
import path from 'node:path';

export class AIBOMGenerator {
  generateAIBOM(modelData: any) {
    const aibom = {
      bomFormat: 'CycloneDX',
      components: [],
      dependencies: [],
      externalReferences: [],
      metadata: {
        component: {
          name: modelData.name,
          version: modelData.version,
          type: 'machine-learning-model',
          description: modelData.description || 'No description available',
          copyright: modelData.copyright || 'NOASSERTION',
          // Use string literal for property name with hyphen
          'bom-ref': `pkg:huggingface/${modelData.author}/${modelData.name}@${modelData.version}`,
        },
        properties: [
          {
            name: 'primaryPurpose',
            value: modelData.primaryPurpose || 'text-to-speech',
          },
          {
            name: 'suppliedBy',
            value: modelData.author,
          },
          {
            name: 'licenses',
            value: modelData.license || 'unknown',
          },
          {
            name: 'downloadLocation',
            value: modelData.downloadUrl,
          },
        ],
      },
    };

    return aibom;
  }

  saveAIBOM(aibom: any, filePath: string) {
    const dir = path.join(process.cwd(), 'generated_aiboms');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Replace slashes in filename with underscores to avoid subfolders
    const safeFileName = filePath.replace(/[\\/]/g, '_');
    const fullPath = path.join(dir, safeFileName);
    fs.writeFileSync(fullPath, JSON.stringify(aibom, null, 2));
  }
}
