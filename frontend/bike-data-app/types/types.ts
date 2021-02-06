export interface IndexSignature {
  [key: string]: any
}
export interface CustomError extends Error {
  info: IndexSignature
  status: number
}
