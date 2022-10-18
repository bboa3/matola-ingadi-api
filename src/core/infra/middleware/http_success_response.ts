export type HttpSuccessResponse = {
  statusCode: number
  body: any
}

export function ok<T> (dto?: T): HttpSuccessResponse {
  return {
    statusCode: 200,
    body: dto
  }
}

export function created<T> (dto?: T): HttpSuccessResponse {
  return {
    statusCode: 201,
    body: dto
  }
}
