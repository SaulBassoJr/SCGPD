import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Container from './components/layout/Container';
import Home from './components/home/Home';

import Navbarr from './components/layout/Navbarr';
import Footer from './components/layout/Footer'

import DisplayClientes from './components/clientes/DisplayClientes';
import ManterClientes from './components/clientes/ManterClientes';
import ManterServicos from './components/servicos/ManterServicos';
import ManterServico from './components/servicos/ManterServico';
import ManterVeiculos from './components/veiculos/ManterVeiculos';
import ManterUsuarios from './components/usuarios/ManterUsuarios';
import ManterOs from './components/os/ManterOs';
import DisplayVeiculos from './components/veiculos/DisplayVeiculos';
import DisplayServicos from './components/servicos/DisplayServicos';
import DisplayOs from './components/os/DisplayOs';


function App() {
  return (
    <Router>
      <Navbarr/>
      <Container className="min-height">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/clientes' element={<DisplayClientes/>}/>
          <Route path='/clientes/novocliente' element={<ManterClientes/>}/>
          <Route path='/os' element={<DisplayOs/>}/>
          <Route path='/os/novaOs' element={<ManterOs/>}/>
          <Route path='/servicos' element={<DisplayServicos/>}/>
          <Route path='/servicos/novoservico/:id' element={<ManterServico/>}/>
          <Route path='/servicos/novoservico' element={<ManterServicos/>}/>
          <Route path='/veiculos' element={<DisplayVeiculos/>}/>
          <Route path='/veiculos/novoveiculo' element={<ManterVeiculos/>}/>
          <Route path='/usuarios/novousuario' element={<ManterUsuarios/>}/>
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
