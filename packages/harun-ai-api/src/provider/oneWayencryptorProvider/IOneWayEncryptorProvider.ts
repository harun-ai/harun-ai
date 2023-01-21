export default interface IOneWayEncryptorProvider {
  encrypt(param: string): Promise<string>;
  compare(param: string, encrypted: string): Promise<boolean>;
}
