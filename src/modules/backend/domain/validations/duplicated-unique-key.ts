export interface DuplicatedUniqueKeyValidation {
  checkDuplicated: (key: any) => Promise<void>;
}
