import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Container from './components/layout/Container';
import Home from './components/home/Home';

import Navbarr from './components/layout/Navbarr';
import Footer from './components/layout/Footer'

import DisplayClientes from './components/clientes/DisplayClientes';
import ManterClientes from './components/clientes/ManterClientes';
import ManterServicos from './components/servicos/ManterServicos';
import ManterVeiculos from './components/veiculos/ManterVeiculos';
import ManterUsuarios from './components/usuarios/ManterUsuarios';
import ManterOs from './components/os/ManterOs';
import NewCliente from './components/clientes/NewCliente';

function App() {
  return (
    <Router>
      <Navbarr/>
      <Container className="min-height">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/clientes' element={<DisplayClientes/>}/>
          <Route exact path='/clientes/novocliente' element={<ManterClientes/>}/>
          <Route exact path='/os/novaOs' element={<ManterOs/>}/>
          <Route exact path='/servicos/novoservico' element={<ManterServicos/>}/>
          <Route exact path='/veiculos/novoveiculo' element={<ManterVeiculos/>}/>
          <Route exact path='/usuarios/novousuario' element={<ManterUsuarios/>}/>
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
