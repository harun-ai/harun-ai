import JsonSchemaProvider from '../JsonSchemaProvider';

describe('jsonSchemaProvider', () => {
  it('validate schema', async () => {
    const jsonSchemaProvider = new JsonSchemaProvider();

    await expect(
      jsonSchemaProvider.validateSchema({
        type: 'string',
      })
    ).resolves.toBe(void 0);
  });

  it('invalidate schema', async () => {
    const jsonSchemaProvider = new JsonSchemaProvider();

    await expect(
      jsonSchemaProvider.validateSchema({
        type: 'strings',
      })
    ).rejects.toThrowError();
  });

  it('validate input', async () => {
    const jsonSchemaProvider = new JsonSchemaProvider();

    await expect(
      jsonSchemaProvider.validate('asd', {
        type: 'string',
      })
    ).resolves.toBe('asd');
  });

  it('invalidate input', async () => {
    const jsonSchemaProvider = new JsonSchemaProvider();

    await expect(
      jsonSchemaProvider.validate(2, {
        type: 'string',
      })
    ).rejects.toThrowError();
  });
});
