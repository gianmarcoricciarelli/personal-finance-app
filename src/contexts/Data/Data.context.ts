import data from '@data/data.json'
import { createContext, Dispatch, SetStateAction } from 'react'

interface DataContext {
    data: typeof data
    setData?: Dispatch<SetStateAction<typeof data>>
}

const DataContext = createContext<DataContext>({ data: { ...data } })

export default DataContext
