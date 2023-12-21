import { ObjectId } from "mongodb";
import { IdValidation } from "@/modules/backend/domain/validations";

export class AdaptMongoIdValidator implements IdValidation {
  isValid = (id: string): boolean => {
    return ObjectId.isValid(id);
  };
}
