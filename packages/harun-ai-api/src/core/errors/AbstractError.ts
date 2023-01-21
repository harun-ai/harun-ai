export default abstract class AbstractError extends Error {
  constructor(readonly name: string, message?: string) {
    super(message);
  }
}
