export interface DepartmentRequest {
  name: string
  description: string
  urlImage: string
}
export interface IDepartment extends DepartmentRequest {
  id: string
}
