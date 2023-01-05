import Ajv from 'ajv';
import InvalidInputParamsError from '../../core/errors/InvalidInputParamsError';

import ISchemaProvider from './ISchemaProvider';

export default class JsonSchemaProvider implements ISchemaProvider {
  private ajv = new Ajv();

  async validateSchema(schema: Record<string, unknown>): Promise<void> {
    this.ajv.compile(schema);
  }

  async validate<ObjectType>(
    object: unknown,
    schema: Record<string, unknown>
  ): Promise<ObjectType> {
    const validator = this.ajv.compile<ObjectType>(schema);

    if (validator(object)) return object;

    console.log(validator.errors);

    throw new InvalidInputParamsError(
      validator.errors.map(error => error.message).join(', ')
    );
  }
}
