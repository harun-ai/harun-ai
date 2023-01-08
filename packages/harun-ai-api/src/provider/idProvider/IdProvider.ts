export default interface IdProvider {
  generateId(): Promise<string>;
}
