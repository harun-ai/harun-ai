type IDTO = {
  Request: unknown;
  Response: unknown;
};

export default interface IUseCase<DTO extends IDTO> {
  use(request: DTO['Request']): Promise<DTO['Response']>;
}
