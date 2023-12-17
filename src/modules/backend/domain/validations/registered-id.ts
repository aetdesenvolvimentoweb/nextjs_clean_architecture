export interface RegisteredIdValidation {
  checkExist: (id: string) => Promise<void>;
}
