import mockData from "../mock-data.json"
import {
  Employee,
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
} from "./types"

const TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }

  const start = page * TRANSACTIONS_PER_PAGE
  const end = start + TRANSACTIONS_PER_PAGE

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${page}`)
  }

  const nextPage = end < data.transactions.length ? page + 1 : null

  return {
    nextPage,
    data: data.transactions.slice(start, end),
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    throw new Error("Employee id cannot be empty")
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}

export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {
  let idx = data.transactions.findIndex((transaction) => transaction.id === transactionId)
  console.log(data.transactions[idx])

  if (idx === -1) {
    throw new Error(`Transaction with id ${transactionId} not found`)
  }

  data.transactions[idx].approved = value
  console.log(data.transactions[idx])
}
