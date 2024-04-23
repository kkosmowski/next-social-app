export const enum HttpStatus {
  // add necessary statuses on the go
  OK = 200,
  Created = 201,
  NoContent = 204,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,

  InternalServerError = 500,
}
