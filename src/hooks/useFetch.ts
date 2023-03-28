import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "../redux/reducer"
import { RootState } from "../redux/store"
import { getWallets } from "../services/api"

const useFetch = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector((state: RootState) => state)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataRequest())
      try {
        const data = await getWallets()
        dispatch(fetchDataSuccess(data))
      } catch (error: any) {
        dispatch(fetchDataFailure(error.message))
      }
    }
    fetchData()
  }, [dispatch])

  return { data, isLoading, error }
}

export default useFetch
