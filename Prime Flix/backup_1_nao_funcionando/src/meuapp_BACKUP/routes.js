import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contato from './pages/Contato'
import Sobre from "./pages/Sobre"
import Home from "./pages/Home"
import Header from "./components/Header"
import Error from "./pages/Error"
import Produto from "./pages/Produto"

function RoutesApp() {

    return (

        
        <BrowserRouter>

            <Header /> 

            <Routes>

                <Route path="/" element={ <Home /> } />
                <Route path="/sobre" element={ <Sobre /> } />
                <Route path="/contato" element={ <Contato />}  />
                <Route path="/produto/:id" element={ <Produto /> } />
                <Route path="*" element={ <Error /> } />
           
            </Routes>

        </BrowserRouter>

    )

}

export default RoutesApp