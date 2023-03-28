import { WalletType } from "../types/wallet"
import { 
  Action, 
  State,
  FETCH_DATA_REQUEST, 
  FETCH_DATA_SUCCESS, 
  FETCH_DATA_FAILURE,
  TOGGLE_FAVOURITE,
  DELETE_WALLET,
  ADD_WALLET,
  SET_ETH_EUR,
  SET_ETH_USD
 } from './types'

const initialState: State = {
  data: [],
  isLoading: false,
  error: ''
}

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST })

export const fetchDataSuccess = (data: WalletType[]) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
})

export const fetchDataFailure = (error: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
})

export const addWallet = (wallet: WalletType) => ({
  type: ADD_WALLET,
  payload: wallet
})


export const deleteWallet = (address: string) => ({
  type: DELETE_WALLET,
  payload: address
})

export const toggleFavourite = (address: string) => ({
  type: TOGGLE_FAVOURITE,
  payload: address
})  

export const setEthEur = (address: string, rate: number) => ({
  type: SET_ETH_EUR,
  payload: { address, rate }
})  

export const setEthUsd = (address: string, rate: number) => ({
  type: SET_ETH_USD,
  payload: { address, rate }
})  

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_DATA_REQUEST: {
      return { ...state, data: [], isLoading: true, error: '' }
    }

    case FETCH_DATA_SUCCESS: {
      return { ...state, data: action.payload, isLoading: false, error: '' }
    }

    case FETCH_DATA_FAILURE: {
      return { ...state, data: [], isLoading: false, error: action.payload }
    }

    case ADD_WALLET: {
      const newData = [...state.data]
      const wallet = action.payload
      newData.push(wallet)
      newData.sort((a: WalletType, b: WalletType) => Number(b.favourite) - Number(a.favourite))
      return {...state, data: newData}
    }

    case DELETE_WALLET: {
      const newData = [...state.data]
      const address = action.payload
      const index = newData.findIndex(wallet => wallet.address === address)
      newData.splice(index, 1)
      return {...state, data: newData}
    }

    case TOGGLE_FAVOURITE: {
      const newData = [...state.data]
      const address = action.payload
      const index = newData.findIndex(wallet => wallet.address === address)
      newData[index] = {
        ...newData[index],
        favourite: !newData[index].favourite
      }  
      newData.sort((a: WalletType, b: WalletType) => Number(b.favourite) - Number(a.favourite))
      return {...state, data: newData}
    } 
    
    case SET_ETH_EUR: {
      const newData = [...state.data]
      const index = newData.findIndex(wallet => wallet.address === action.payload.address)
      newData[index] = {
        ...newData[index],
        ethEur:  action.payload.rate
      }        
      return { ...state, data: newData }
    }

    case SET_ETH_USD: {
      const newData = [...state.data]
      const index = newData.findIndex(wallet => wallet.address === action.payload.address)
      newData[index] = {
        ...newData[index],
        ethUsd:  action.payload.rate
      }        
      return { ...state, data: newData }
    }

    default: {
      return state
    }
  }
}
