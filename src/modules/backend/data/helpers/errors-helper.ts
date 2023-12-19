import { CustomAppError } from "@/modules/backend/domain/errors";

export const duplicatedKeyError = (key: string) => {
  return new CustomAppError(
    `Já existe um registro com esse valor para o campo ${key}.`,
    400
  );
};

export const invalidParamError = (param: string) => {
  return new CustomAppError(`Valor inválido para o campo ${param}.`, 400);
};

export const missingParamError = (param: string) => {
  return new CustomAppError(`Preencha o campo ${param}.`, 400);
};

export const noRegisteredError = (entitie: string) => {
  return new CustomAppError(
    `Registro não encontrado para esse(a) ${entitie}.`,
    400
  );
};
