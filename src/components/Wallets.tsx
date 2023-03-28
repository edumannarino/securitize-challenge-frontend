import { WalletType } from '../types/wallet'
import useFetch from "../hooks/useFetch"
import Spinner from 'react-bootstrap/Spinner'
import Wallet from './Wallet'
import AddWallet from './AddWallet'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useState } from 'react'

const Wallets = () => {
  const { data, isLoading, error } = useFetch()
  const [showAdd, setShowAdd] = useState<boolean>(false)

  if (isLoading) {
    return (
      <div className="text-center">
        <h3>Loading....</h3>
        <Spinner/>
      </div>
    )
  }

  if (error) {
    return <h2 className="text-center">Error: {error}</h2>
  }

  return (
    <>
    <Modal size="xl" dialogClassName="modal-90w" centered show={showAdd} onHide={() => setShowAdd(false)}>
      <Modal.Body>
        <AddWallet setShowAdd={setShowAdd}/>    
      </Modal.Body>
    </Modal>      
    <div className="border d-flex flex-column p-2 my-2">
      <Container>
        <Row>
          <Col>
          <div className='d-flex'>
            <h3 className='text-center m-0' style={{width: "100%"}}>List of Wallets</h3>
            <Button onClick={() => setShowAdd(true)}>➕</Button>
          </div>
          </Col>
        </Row>
      </ Container>
      {data.map((wallet: WalletType) => 
        <Wallet key={wallet.address} wallet={wallet} />
      )}
    </div>
    </>
  )
}

export default Wallets
