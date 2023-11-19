import{BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Container from './components/layout/Container';
import Home from './components/home/Home';

import Navbarr from './components/layout/Navbarr';
import Footer from './components/layout/Footer'

import DisplayClientes from './components/clientes/DisplayClientes';
import ManterClientes from './components/clientes/ManterClientes';
import ManterCliente from './components/clientes/ManterCliente';
import ManterServicos from './components/servicos/ManterServicos';
import ManterServico from './components/servicos/ManterServico';
import ManterVeiculos from './components/veiculos/ManterVeiculos';
import ManterVeiculo from './components/veiculos/ManterVeiculo';
import ManterUsuarios from './components/usuarios/ManterUsuarios';
import ManterOs from './components/os/ManterOs';
import DisplayVeiculos from './components/veiculos/DisplayVeiculos';
import DisplayServicos from './components/servicos/DisplayServicos';
import DisplayOs from './components/os/DisplayOs';
import LoginPage from './components/login/LoginPage';

import { useLocation, useNavigate  } from 'react-router-dom';

function NavbarConditional() {
  const location = useLocation();

  // Lista de rotas onde a Navbar não deve ser exibida
  const excludedRoutes = ['/']; // Adicione as rotas onde não deseja exibir a Navbar

  if (excludedRoutes.includes(location.pathname)) {
    return null; // Não renderiza a Navbar nas rotas da lista excludedRoutes
  }

  return <Navbarr />; // Renderiza a Navbar em outras rotas
}

const isUserAuthenticated = false;

function App() {
  

  return (
    <Router>
      <NavbarConditional />
      <Container className="min-height">
        <Routes>
          <Route exact path='/home' element={isUserAuthenticated ? <Home/> : <Navigate to="/" />}/>
          <Route path="/" element={<LoginPage />} />
          <Route path='/clientes' element={isUserAuthenticated ? <DisplayClientes /> : <Navigate to="/" />}/>
          <Route path='/clientes/novocliente/:id' element={isUserAuthenticated ? <ManterCliente /> : <Navigate to="/" />}/>
          <Route path='/clientes/novocliente' element={isUserAuthenticated ? <ManterClientes /> : <Navigate to="/" />}/>
          <Route path='/os' element={isUserAuthenticated ? <DisplayOs /> : <Navigate to="/" />}/>
          <Route path='/os/novaOs' element={isUserAuthenticated ? <ManterOs /> : <Navigate to="/" />}/>
          <Route path='/servicos'  element={isUserAuthenticated ? <DisplayServicos /> : <Navigate to="/" />}/>
          <Route path='/servicos/novoservico/:id' element={isUserAuthenticated ? <ManterServico /> : <Navigate to="/" />}/>
          <Route path='/servicos/novoservico' element={isUserAuthenticated ? <ManterServicos /> : <Navigate to="/" />}/>
          <Route path='/veiculos' element={isUserAuthenticated ? <DisplayVeiculos /> : <Navigate to="/" />}/>
          <Route path='/veiculos/novoveiculo/:id' element={isUserAuthenticated ? <ManterVeiculo /> : <Navigate to="/" />}/>
          <Route path='/veiculos/novoveiculo' element={isUserAuthenticated ? <ManterVeiculos /> : <Navigate to="/" />}/>
          <Route path='/usuarios/novousuario' element={isUserAuthenticated ? <ManterUsuarios /> : <Navigate to="/" />}/>
          {/* <Route exact path='/usuarios' element={<UsuariosListagem/>}/>
          <Route exact path='/usuarios/novousuario' element={<UsuariosCadastro/>}/>
          <Route exact path='/os' element={<OsListagem/>}/>
          <Route exact path='/os/novaos' element={<OsCadastro/>}/>
          <Route exact path='/veiculos' element={<VeiculosListagem/>}/>
          <Route exact path='/veiculos/novoveiculo' element={<VeiculosCadastro/>}/> */}
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
