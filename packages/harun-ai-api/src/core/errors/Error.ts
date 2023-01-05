export default abstract class IError extends Error {
  constructor(readonly name: string, message?: string) {
    super(message);
  }
}
