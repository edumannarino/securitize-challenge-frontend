import { useDispatch } from "react-redux"
import { setEthEur, setEthUsd } from "../redux/reducer"
import { Col } from "react-bootstrap"
import { Rate } from "./Rate"
import { WalletType } from "../types/wallet"

type RatesProps = {
  wallet: WalletType
}

export const Rates = ( { wallet }: RatesProps) => {
  const dispatch = useDispatch();

  return (
    <Col >
      <Rate 
        currency={"EUR"} 
        address={wallet.address}
        rate={wallet.ethEur}
        dispatch={(address: string, rate: number) => dispatch(setEthEur(address, rate))}
      />
      <Rate
        currency={"USD"}
        address={wallet.address}
        rate={wallet.ethUsd}
        dispatch={(address: string, rate: number) => dispatch(setEthUsd(address, rate))}
      />
    </Col>
  )
}