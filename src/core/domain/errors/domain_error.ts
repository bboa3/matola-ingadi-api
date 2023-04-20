export interface DomainError {
  message: string
}

export class DatabaseFailError extends Error implements DomainError {
  constructor () {
    super('Oops! Erro. Por favor contacte suporte')
    this.name = 'DatabaseFailed'
  }
}

export class EntityNotFoundError extends Error implements DomainError {
  constructor (name: string) {
    super(`${name} not found`)
    this.name = 'EntityNotFound'
  }
}

export class ExtractDataFailError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'ExtractDataFailed'
  }
}

export class EntityAlreadyExistError extends Error implements DomainError {
  constructor (name: string) {
    super(`The ${name} already exist`)
    this.name = 'EntityAlreadyExist'
  }
}
