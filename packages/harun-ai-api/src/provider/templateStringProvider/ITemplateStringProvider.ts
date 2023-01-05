export default interface ITemplateStringProvider {
  render(source: string, params: Record<string, unknown>): Promise<string>;
}
