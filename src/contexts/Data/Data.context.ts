import data from '@data/data.json'
import { createContext } from 'react'

interface DataContext {
    data: typeof data
}

const DataContext = createContext<DataContext>({ data: { ...data } })

export default DataContext
