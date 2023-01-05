export default interface IdProvider<IdType> {
  generateId(): IdType;
}
