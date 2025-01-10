import dataJson from '@data/data.json'
import { ReactNode, useState } from 'react'
import DataContext from './Data.context'

export default function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState({ ...dataJson })

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}
