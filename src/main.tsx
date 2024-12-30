import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Root from './Root.tsx'
import ViewportObserverProvider from './contexts/ViewportObserver/ViewportObserver.provider.tsx'
import './index.css'
import Home from './pages/Home/Home.tsx'

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
            </Route>
        </Routes>
    </BrowserRouter>
)
