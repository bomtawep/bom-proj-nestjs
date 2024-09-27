import { HttpException } from '@nestjs/common/exceptions/http.exception';

export const ErrorException = () => {
  const AlreadyExists = new HttpException('Already Exists', 409);
  const NotFound = new HttpException('Not Found', 404);
  const BadRequest = new HttpException('Bad Request', 400);
  const Unauthorized = new HttpException('Unauthorized', 401);
  const Forbidden = new HttpException('Forbidden', 403);
  const InternalServerError = new HttpException('Internal Server Error', 500);

  return {
    AlreadyExists,
    NotFound,
    BadRequest,
    Unauthorized,
    Forbidden,
    InternalServerError,
  };
};
