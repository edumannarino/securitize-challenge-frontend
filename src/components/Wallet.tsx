import { useDispatch } from "react-redux"
import { deleteWallet, toggleFavourite } from "../redux/reducer"
import { WalletType } from '../types/wallet'
import { ReactComponent as SolidHeart } from '../images/heart-solid.svg'
import { ReactComponent as RegularHeart } from '../images/heart-regular.svg'
import { ReactComponent as Trash } from '../images/trash-solid.svg'
import { Container, Row, Stack } from 'react-bootstrap'
import { deleteWallet as deleteWalletDB, updateFavourite } from "../services/api"
import { Rates } from "./Rates"
import { Balance } from "./Balance"
import { Btn } from "./Btn"
import { useContext } from "react"
import ModalMessageContext from "./context/ModalMessageContext"

type WalletProps = {
  wallet: WalletType
}

const Wallet = ({ wallet }: WalletProps) => {
  const dispatch = useDispatch();
  const { displayModalMessage } = useContext(ModalMessageContext)

  const handleClickFavourite = (address: string, favourite: boolean) => {
    updateFavourite(address, favourite)
      .then(() => dispatch(toggleFavourite(address)))
      .catch(error => displayModalMessage(`⛔ Error Updating Wallet: ${error.message}`))
  }


  const handleClickDelete = (address: string) => {
    deleteWalletDB(address)
      .then(() => dispatch(deleteWallet(address)))
      .catch(error => displayModalMessage(`⛔ Error Deleting Wallet: ${error.message}`))
  }

  return (
    <div className='border p-2 m-2' style={{ backgroundColor: '#f0f0f0'}}>
      { wallet.isOld && <h6 className='border bg-danger text-center p-2'> ⚠️ Wallet is old</h6> }
      <Stack direction="horizontal" gap={3}>
          <h4 className='m-2'>Address: {wallet.address}</h4>
          <Btn 
            align={'ms-auto'} 
            title={`${wallet.favourite ? 'Remove from' : 'Add to'} Favourites`} 
            style={{ width: 40 }} 
            onClick={() => handleClickFavourite(wallet.address, !wallet.favourite)}
          >
            { wallet.favourite && <SolidHeart /> }
            { !wallet.favourite && <RegularHeart /> }
          </Btn>          
          <Btn 
            align={''}
            title="Delete Wallet"
            style={{ width: 40 }}
            onClick={() => handleClickDelete(wallet.address)}
          >
            <Trash />
          </Btn>
      </Stack>
      <Container>
        <Row className="align-items-center">
          <Rates wallet={wallet} />
          <Balance wallet={wallet}/>
        </Row>
      </Container>
    </div>
  )
}

export default Wallet
