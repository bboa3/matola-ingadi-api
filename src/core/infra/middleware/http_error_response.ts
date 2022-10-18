export type HttpErrorResponse = {
  statusCode: number
  body: any
}

export function clientError (error: Error): HttpErrorResponse {
  return {
    statusCode: 400,
    body: {
      message: error.message
    }
  }
}

export function unauthorized (error: Error): HttpErrorResponse {
  return {
    statusCode: 401,
    body: {
      message: error.message
    }
  }
}

export function forbidden (error: Error): HttpErrorResponse {
  return {
    statusCode: 403,
    body: {
      message: error.message
    }
  }
}

export function notFound (error: Error): HttpErrorResponse {
  return {
    statusCode: 404,
    body: {
      message: error.message
    }
  }
}

export function conflict (error: Error): HttpErrorResponse {
  return {
    statusCode: 409,
    body: {
      message: error.message
    }
  }
}

export function tooMany (error: Error): HttpErrorResponse {
  return {
    statusCode: 429,
    body: {
      message: error.message
    }
  }
}

export function fail (error: Error) {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      message: error.message
    }
  }
}
