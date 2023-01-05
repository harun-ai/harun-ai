export default interface ISchemaProvider {
  validateSchema(schema: Record<string, unknown>): Promise<void>;
  validate<ObjectType>(
    object: unknown,
    schema: Record<string, unknown>
  ): Promise<ObjectType>;
}
