import { WalletType } from "../types/wallet"

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST"
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"
export const ADD_WALLET = "ADD_WALLET"
export const DELETE_WALLET = "DELETE_WALLET"
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE"
export const SET_ETH_EUR = "SET_ETH_EUR"
export const SET_ETH_USD = "SET_ETH_USD"

export type State = {
  data: WalletType[],
  isLoading: boolean,
  error: string,
}

type FetchSuccessRequest = {
  type: typeof FETCH_DATA_REQUEST,
}

type FetchSuccessAction = {
  type: typeof FETCH_DATA_SUCCESS,
  payload: WalletType[]
}

type FetchFailureAction = {
  type: typeof FETCH_DATA_FAILURE,
  payload: string
}

type AddWalletAction = {
  type: typeof ADD_WALLET,
  payload: WalletType
}

type DeleteWalletAction = {
  type: typeof DELETE_WALLET,
  payload: string
}

type ToggleFavouriteAction = {
  type: typeof TOGGLE_FAVOURITE,
  payload: string
}

type SetEthEurAction = {
  type: typeof SET_ETH_EUR,
  payload: {address: string, rate: number}
}

type SetEthUsdAction = {
  type: typeof SET_ETH_USD,
  payload: {address: string, rate: number}
}

export type Action = 
  FetchSuccessRequest | 
  FetchSuccessAction | 
  FetchFailureAction | 
  AddWalletAction |
  DeleteWalletAction |
  ToggleFavouriteAction |
  SetEthEurAction |
  SetEthUsdAction