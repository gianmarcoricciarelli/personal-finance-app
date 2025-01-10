import DataContext from '@contexts/Data/Data.context'
import ViewportObserverProvider from '@contexts/ViewportObserver/ViewportObserver.provider'
import data from '@data/data.json'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Budgets from './pages/Budgets/Budgets'
import Home from './pages/Home/Home'
import Pots from './pages/Pots/Pots'
import RecurringBills from './pages/RecurringBills/RecurringBills'
import Transactions from './pages/Transactions/Transactions'
import Root from './Root'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={
                    <DataContext.Provider value={{ data: { ...data } }}>
                        <ViewportObserverProvider>
                            <Root />
                        </ViewportObserverProvider>
                    </DataContext.Provider>
                }
            >
                <Route index element={<Home />} />
                <Route path='pots' element={<Pots />} />
                <Route path='transactions' element={<Transactions />} />
                <Route path='budgets' element={<Budgets />} />
                <Route path='recurring-bills' element={<RecurringBills />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
