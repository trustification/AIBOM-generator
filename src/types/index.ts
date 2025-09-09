export interface ModelMetadata {
  name: string;
  author: string;
  url: string;
  version: string;
  description?: string;
}

export interface AIBOM {
  bomFormat: string;
  components: Array<{
    name: string;
    version: string;
    description?: string;
    authors: Array<{ name: string }>;
    licenses: Array<{ license: { id: string; url: string } }>;
    externalReferences: Array<{ type: string; url: string }>;
    modelCard?: {
      modelParameters: {
        architectureFamily: string;
        inputs: Array<{ format: string }>;
        outputs: Array<{ format: string }>;
        task: string;
      };
      properties: Array<{ name: string; value: string }>;
    };
  }>;
  dependencies?: Array<{
    dependsOn: Array<string>;
    ref: string;
  }>;
  metadata: {
    component: {
      name: string;
      version: string;
      type: string;
    };
    properties: Array<{ name: string; value: string }>;
  };
  serialNumber: string;
  specVersion: string;
  version: number;
}

