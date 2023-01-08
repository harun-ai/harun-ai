export default interface IEncryptorProvider {
  encrypt(param: string): Promise<string>;
  compare(param: string, encrypted: string): Promise<boolean>;
}
