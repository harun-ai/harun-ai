export default interface ISchemaProvider {
  validate<SchemaType>(): Promise<SchemaType>;
}
