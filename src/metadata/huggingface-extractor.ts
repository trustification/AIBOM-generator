export interface ModelMetadata {
  name: string;
  description?: string;
  tags?: string[];
  license?: string;
  version?: string;
  author?: string;
}

export interface HuggingFaceModel {
  modelId: string;
  description?: string;
  tags?: string[];
  license?: string;
  version?: string;
  author?: string;
}

export function extractMetadataFromHuggingFace(modelData: HuggingFaceModel): ModelMetadata {
  return {
    name: modelData.modelId,
    description: modelData.description,
    tags: modelData.tags,
    license: modelData.license,
    version: modelData.version,
    author: modelData.author,
  };
}