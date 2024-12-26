import type { IQuery } from './query.type'

export interface DepartmentRequest {
  name: string
  description: string
  urlImage: string
}
export interface IDepartment extends DepartmentRequest {
  id: string
}

export interface QueryDepartment extends IQuery {
  name: string
}
