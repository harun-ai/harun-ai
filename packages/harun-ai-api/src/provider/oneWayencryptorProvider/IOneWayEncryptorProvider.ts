export default interface IOneWayEncryptorProvider {
  encrypt<ParamType>(param: ParamType): Promise<string>;
  compare(param: string, encrypted: string): Promise<boolean>;
}
