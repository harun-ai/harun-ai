export default interface ITwoWayEncryptorProvider {
  encrypt<ParamType>(param: ParamType): Promise<string>;
  decrypt<ParamType>(encrypted: string): Promise<ParamType>;
}
