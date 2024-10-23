import type { IDepartment } from './department.types'

export interface IPackage {
  id: string
  name: string
  description: string
  price: string
  department: IDepartment
}
