import { IdValidation } from "@/modules/backend/domain/validations";

export class MockIdValidator implements IdValidation {
  isValid = (id: string): boolean => {
    return false;
  };
}
