import MustacheTemplateStringProvider from '../MustacheTemplateStringProvider';

describe('MustacheTemplateStringProvider', () => {
  it('render template string', async () => {
    const templateStringProvider = new MustacheTemplateStringProvider();

    await expect(
      templateStringProvider.render('test {{test}}', { test: 'it works!' })
    ).resolves.toBe('test it works!');
  });

  it('render template string without vars', async () => {
    const templateStringProvider = new MustacheTemplateStringProvider();

    await expect(
      templateStringProvider.render('test {{test}}', {})
    ).resolves.toBe('test ');
  });
});
