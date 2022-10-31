import { Id } from '@user/domain/requiredFields/id'
import { User } from 'ingadi'

interface FindUserByIdProps {
  id: Id
}

export type FindUserByIdDB = (data: FindUserByIdProps) => Promise<User>
