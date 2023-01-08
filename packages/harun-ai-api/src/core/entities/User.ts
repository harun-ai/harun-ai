import Model from './Model';

export default class User {
  id: string;
  createdAt = new Date();
  updatedAt = new Date();
  private verified = false;
  name: string;
  email: string;
  password?: string;
  models?: Partial<Model>[];

  constructor(
    params: Omit<
      User,
      | 'createdAt'
      | 'updatedAt'
      | 'update'
      | 'isVerified'
      | 'setVerified'
      | 'setUnverified'
    >
  ) {
    Object.assign(this, params);
  }

  update(
    params: Partial<
      Omit<
        User,
        | 'createdAt'
        | 'updatedAt'
        | 'update'
        | 'isVerified'
        | 'setVerified'
        | 'setUnverified'
      >
    >
  ) {
    this.updatedAt = new Date();
    Object.assign(this, params);
  }

  isVerified(): boolean {
    return this.verified;
  }

  setVerified() {
    this.verified = true;
  }

  setUnverified() {
    this.verified = false;
  }
}
