import { WalletType } from "../types/wallet"

const url = process.env.REACT_APP_API_URL

export const getWallets = async () => {
  const response = await fetch(`${url}/wallets`)
  const data = await response.json()
  data.sort((a: WalletType, b: WalletType) => Number(b.favourite) - Number(a.favourite))  
  return data
}

export const addWallet = async (address: string, favourite: boolean, ethEur: number, ethUsd: number) => {
  const body = { address, favourite, ethEur, ethUsd }
  const response = await fetch(`${url}/wallets`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },        
  })
  if (response.status !== 201)
    if (response.status === 409)
      throw new Error('Wallet already added')
    else
      throw new Error(response.statusText)
  return await response.json()
}

export const updateFavourite = async (address: string, favourite: boolean) => {
  const body = { favourite: favourite }
  await fetch(`${url}/wallets/${address}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },        
  })
}

export const updateRate = async (currency: string, address: string, rate: number) => {
  const body = { [currency]: rate }
  await fetch(`${url}/wallets/${address}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },        
  })
}



export const deleteWallet = async (address: string) => {
  await fetch(`${url}/wallets/${address}`, {
    method: "DELETE",
  })
}

export const getRates = async () => {
  const response = await fetch(`${url}/rates`)
  const rates = await response.json()
  return rates.ethereum
}
