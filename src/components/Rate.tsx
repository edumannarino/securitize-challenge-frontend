import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { ReactComponent as Reload } from '../images/reload-solid.svg'
import { ReactComponent as Edit } from '../images/edit-solid.svg'
import { Btn } from "./Btn"
import { useContext, useRef, useState } from "react"
import { getRates, updateRate } from "../services/api"
import ModalMessageContext from "./context/ModalMessageContext"

type RateProps = {
  currency: string,
  address: string, 
  rate: number,
  dispatch: (address: string, rate: number) => void
}

export const Rate = ({ currency, address, rate, dispatch }: RateProps) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editRate, setEditRate] = useState<number>(rate)
  const inputRef = useRef<HTMLInputElement>(null)
  const { displayModalMessage } = useContext(ModalMessageContext)

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit(true)
    if (inputRef.current) {
      inputRef.current.disabled = false
      inputRef.current.focus()
    }
  }

  const handleGetOnlineRate = () => {
    getRates()
      .then(rates => {
        const rate = currency === 'EUR' ? rates.eur : rates.usd
        const currencySymbol = currency === 'EUR' ? 'ethEur' : 'ethUsd'
        updateRate(currencySymbol, address, rate)
          .then(() => {
            dispatch(address, rate)
            setEditRate(rate)
          })
          .catch(error => displayModalMessage(`⛔ Error Setting Rate: ${error.message}`))
      })
      .catch(error => displayModalMessage(`⛔ Error Getting Rates: ${error.message}`))
  }

  const handleSetRate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const currencySymbol = currency === 'EUR' ? 'ethEur' : 'ethUsd'
    updateRate(currencySymbol, address, editRate)
      .then(() => {
        dispatch(address, editRate)
        setEdit(false)
      })
      .catch(error => displayModalMessage(`⛔ Error Setting Rate: ${error.message}`))
  }
  
  const handleCancelSetRate = () => {
    setEdit(false)
    setEditRate(rate)
  }

  return (
    <Stack className='border' direction="horizontal" gap={1}>
      <Stack direction="horizontal" gap={1}>
        <h5 className='m-1'>{`Rate ${currency}:`}</h5>      
        <Form >
          <Row className="align-items-center">
            <Col  xs="auto">
              <Form.Control
                className="fs-5"
                size="sm" 
                type="text" 
                placeholder="Enter Rate" 
                value={editRate}
                htmlSize={5}
                onChange={(e) => setEditRate(Number(e.target.value))}
                onKeyDown={(e) => {if (e.key === 'Escape') handleCancelSetRate()}}
                disabled={!edit}
                ref={inputRef}
              />
            </Col>
            <Col className="p-1">
              { edit &&
                <Button
                  size="sm"
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleSetRate(e)}
                >
                  ✔️
                </Button>          
              }
            </Col>
            <Col className="p-1">
              { edit &&
                <Button
                  size="sm"
                  variant="primary"
                  type="button"
                  onClick={handleCancelSetRate}
                >
                  ❌
                </Button>          
              }
            </Col>            
          </Row>
        </Form>
      </Stack>      
      {!edit &&
        <Btn align={'ms-auto'} title={'Edit Rate'} style={{ width: 30 }} onClick={(e) => handleEdit(e)}>
          <Edit />
        </Btn>
      }
      <Btn align={`${edit ? 'ms-auto' : ''}`} title={'Get Online Rate'} style={{ width: 30 }} onClick={handleGetOnlineRate}>
        <Reload />
      </Btn>
    </Stack>
  )
}