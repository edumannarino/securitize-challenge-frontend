import { useState } from "react"
import { Col, Stack } from "react-bootstrap"
import { ethers } from 'ethers'
import { WalletType } from "../types/wallet"

type BalanceProps = {
  wallet: WalletType
}

export const Balance = ({ wallet }: BalanceProps) => {
  const [currency, setCurrency] = useState<string>('EUR')

  const calculateValue = () => {
    const weiToEther = Number(ethers.formatEther(wallet.balance))
    const value = weiToEther * (currency === 'USD' ? wallet.ethUsd : wallet.ethEur)
    return value.toFixed(2)
  }

  return (
    <Col>
      <Stack className="border" direction="horizontal" gap={3}>
        <select className="form-select-lg" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value='EUR'>EUR</option>
          <option value='USD'>USD</option>
        </select>
        <Stack>
          <h5 className="m-0">{`ETH Balance: ${ethers.formatEther(wallet.balance)}`}</h5>
          <h5 className="m-0">{`Wallet Value: ${calculateValue()} ${currency}`}</h5>
        </Stack>
      </Stack>
    </Col>
  )
}