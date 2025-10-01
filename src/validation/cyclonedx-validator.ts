import Ajv, { ErrorObject } from "ajv";
import cyclonedxSchema from "./schemas/cyclonedx-v1.6.schema.json";

interface AIBOMMetadata {
  component?: {
    type: string;
    // Add other component properties as needed
  };
  // Add other metadata properties as needed
}

interface AIBOM {
  [key: string]: unknown;
  metadata?: AIBOMMetadata;
}

export function validateCycloneDX(bom: object): { valid: boolean; errors?: ErrorObject[] } {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(cyclonedxSchema);
  const valid = validate(bom);

  // Cast the bom to AIBOM type for additional validation
  const aibom = bom as AIBOM;

  // Additional AIBOM-specific validation
  if (aibom.metadata?.component?.type !== 'machine-learning-model') {
    return {
      valid: false,
      errors: [{
        keyword: 'type',
        instancePath: '/metadata/component/type',
        schemaPath: '#/properties/metadata/properties/component/properties/type',
        params: { type: aibom.metadata?.component?.type },
        message: 'Component type must be machine-learning-model'
      } as ErrorObject]
    };
  }

  // Return CycloneDX validation results
  return { 
    valid, 
    errors: validate.errors as ErrorObject[] 
  };
}

export class CycloneDXValidator {
  private ajv: Ajv;
  private schema: any; // Will be replaced with proper schema import

  constructor() {
    this.ajv = new Ajv();
    // Load CycloneDX schema
    this.schema = cyclonedxSchema;
  }

  validate(aibom: AIBOM): ValidationResult {
    const errors: ValidationError[] = [];
    
    if (!this.validateRequiredFields(aibom, errors)) {
      return { valid: false, errors };
    }

    if (!this.validateComponentType(aibom, errors)) {
      return { valid: false, errors };
    }

    if (!this.ajv.validate(this.schema, aibom)) {
      errors.push({
        field: 'schema',
        message: this.ajv.errorsText(),
      });
      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  }

  private validateRequiredFields(aibom: AIBOM, errors: ValidationError[]): boolean {
    const required = [
      'bomFormat',
      'specVersion',
      'version',
      'metadata',
      'components',
    ];

    let valid = true;
    for (const field of required) {
      if (!aibom[field]) {
        errors.push({
          field,
          message: `Missing required field: ${field}`,
        });
        valid = false;
      }
    }
    return valid;
  }

  private validateComponentType(aibom: AIBOM, errors: ValidationError[]): boolean {
    if (aibom.metadata?.component?.type !== 'machine-learning-model') {
      errors.push({
        field: 'metadata.component.type',
        message: "Component type must be 'machine-learning-model'",
      });
      return false;
    }
    return true;
  }
}

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}