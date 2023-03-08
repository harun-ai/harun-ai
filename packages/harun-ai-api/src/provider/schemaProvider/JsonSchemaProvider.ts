import Ajv from 'ajv';
import InvalidInputParamsError from '../../core/errors/InvalidInputParamsError';

import ISchemaProvider from './ISchemaProvider';

export default class JsonSchemaProvider implements ISchemaProvider {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.ajv.addKeyword('sequenceNumber');
    this.ajv.addKeyword('choices');
  }

  async validateSchema(schema: Record<string, unknown>): Promise<void> {
    this.ajv.compile(schema);
  }

  async validate<ObjectType>(
    object: unknown,
    schema: Record<string, unknown>
  ): Promise<ObjectType> {
    const validator = this.ajv.compile<ObjectType>(schema);

    if (validator(object)) return object;

    throw new InvalidInputParamsError(
      validator.errors?.map(error => error.message).join(', ')
    );
  }
}
