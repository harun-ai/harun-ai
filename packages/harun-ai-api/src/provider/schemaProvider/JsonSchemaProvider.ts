import Ajv from 'ajv';

import ISchemaProvider from './ISchemaProvider';

export default class JsonSchemaProvider implements ISchemaProvider {
  private ajv = new Ajv();

  async validateSchema(object: Record<string, any>): Promise<void> {
    this.ajv.compile(object);
  }
}
