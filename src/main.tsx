import { createRoot } from 'react-dom/client'
import Root from './Root.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home/Home.tsx'
import ViewportObserverProvider from './contexts/ViewportObserver/ViewportObserver.provider.tsx'

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
