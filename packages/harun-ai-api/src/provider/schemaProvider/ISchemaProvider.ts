export default interface ISchemaProvider {
  validateSchema(object: Record<string, any>): Promise<void>;
}
