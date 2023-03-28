import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch  } from "react-redux"
import { addWallet } from '../redux/reducer'
import { addWallet as addWalletDB, getRates} from '../services/api'
import { Btn } from './Btn'
import ModalMessageContext from './context/ModalMessageContext'
import { ReactComponent as SolidHeart } from '../images/heart-solid.svg'
import { ReactComponent as RegularHeart } from '../images/heart-regular.svg'

type AddWalletProps = {
  setShowAdd: any
}

const AddWallet = ({ setShowAdd }: AddWalletProps) => {
  const [address, setAddress] = useState<string>('')
  const [favourite, setFavourite] = useState<boolean>(false)
  const [addingWallet, setAddingWallet] = useState<boolean>(false)
  const dispatch = useDispatch();
  const { displayModalMessage } = useContext(ModalMessageContext)

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (!ethers.isAddress(address)) {
        displayModalMessage('⛔ Error Adding Wallet: Address is not a valid Etheruem Address')      
        return
      }
      setAddingWallet(true)
      const rates = await getRates()
      const wallet = await addWalletDB(address, favourite, rates.eur, rates.usd)
      dispatch(addWallet(wallet))
      setShowAdd(false)
      setAddress('')
    } catch(error: any) {
      setAddingWallet(false)
      displayModalMessage(`⛔ Error Adding Wallet: ${error.message}`)
      console.log("Error Adding Wallet", error)
    }
  }

  const handleClickFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFavourite(prevFavourite => !prevFavourite)
  }

  return (
    <div className='p-2'>
      <h3 className="text-center"> Add a new Wallet</h3>
      <Form>
        <Row className='flex-nowrap'>
          <Col className='p-0'>
            <Form.Label column="lg">Address</Form.Label>
          </Col>    
          <Col xs={8} >
            <Form.Control 
              size="lg" 
              type="text" 
              placeholder="Enter Address" 
              width={200}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoFocus
            />
          </Col>
          <Col className='d-flex justify-content-center p-0' >
            <Btn
              align={''} 
              title={''} 
              style={{ width: 50 }} 
              onClick={e => handleClickFavourite(e)}
            >
              { favourite && <SolidHeart /> }
              { !favourite && <RegularHeart /> }
            </Btn>
          </Col>
          <Col style={{display: "contents"}}>
            <Button
              size="lg"
              variant="primary"
              title='Add Wallet'
              type="submit"
              onClick={handleAdd}
            >
              ✔️
            </Button>      
          </Col>    
          <Col>
            <Button
              size="lg"
              variant="primary"
              title='Cancel'
              type="button"
              onClick={() => setShowAdd(false)}
            >
              ❌
            </Button>      
          </Col>    
        </Row>
      </Form>
      {addingWallet && <h4 className='text-center mt-4'>Adding Wallet, please wait...</h4>}
    </div>
  )
}

export default AddWallet