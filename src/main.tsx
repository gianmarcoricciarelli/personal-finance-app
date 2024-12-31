import ViewportObserverProvider from '@contexts/ViewportObserver/ViewportObserver.provider'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Home from './pages/Home/Home'
import Pots from './pages/Pots/Pots'
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
            </Route>
        </Routes>
    </BrowserRouter>
)
