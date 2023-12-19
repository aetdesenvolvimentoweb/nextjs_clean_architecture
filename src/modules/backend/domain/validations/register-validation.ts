export interface RegisterValidation {
  isRegistered: (id: string) => Promise<void>;
}
