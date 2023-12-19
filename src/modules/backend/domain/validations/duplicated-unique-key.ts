export interface DuplicatedUniqueKeyValidation {
  isDuplicated: (key: any) => Promise<void>;
}
