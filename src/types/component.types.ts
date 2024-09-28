export interface ISelect {
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  filterMethod?: (value: string) => any
  remote?: boolean
  remoteMethod?: (value: string) => any
  popperClass?: string
  reserveKeyword?: boolean
  showPrefix?: boolean
}
