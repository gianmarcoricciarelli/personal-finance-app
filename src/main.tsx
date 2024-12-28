import { createRoot } from 'react-dom/client'
import Root from './Root.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home/Home.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Root />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
