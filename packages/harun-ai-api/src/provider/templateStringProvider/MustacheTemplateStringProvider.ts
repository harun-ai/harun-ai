import Mustache from 'mustache';

import ITemplateStringProvider from './ITemplateStringProvider';

export default class MustacheTemplateStringProvider
  implements ITemplateStringProvider
{
  async render(
    source: string,
    params: Record<string, unknown>
  ): Promise<string> {
    return Mustache.render(source, params);
  }
}
