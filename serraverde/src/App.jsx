
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './Pages/AuthContext.jsx'
import RotaProtegida from './Pages/RotaProtegida.jsx'
import Login from './Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Caixa from './Pages/Caixa.jsx'
import ModuloEmDesenvolvimento from './Pages/ModuloEmDesenvolvimento.jsx'
import Estoque from './Pages/Estoque.jsx'
import './Css/Global.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<RotaProtegida />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/caixa"
              element={<Caixa nome="Caixa" />}
            />

           <Route path="/estoque" element={<Estoque />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
