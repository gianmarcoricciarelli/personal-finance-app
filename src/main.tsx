import ViewportObserverProvider from '@contexts/ViewportObserver/ViewportObserver.provider'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Budgets from './pages/Budgets/Budgets'
import Home from './pages/Home/Home'
import Pots from './pages/Pots/Pots'
import Transactions from './pages/Transactions/Transactions'
import Root from './Root'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={
                    <ViewportObserverProvider>
                        <Root />
                    </ViewportObserverProvider>
                }
            >
                <Route index element={<Home />} />
                <Route path='pots' element={<Pots />} />
                <Route path='transactions' element={<Transactions />} />
                <Route path='budgets' element={<Budgets />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
