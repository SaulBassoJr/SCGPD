import logo from '../../img/Logo500P500.png';
import styles from './navbar-styles.css';
import {FaHome, FaUsers, FaUserFriends, FaTruck, FaTools, FaFileAlt, FaDollarSign} from 'react-icons/fa'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function Navbarr(){
    return(
        <Navbar className={styles.navbar}  collapseOnSelect variant="dark" expand="lg">
            <Navbar.Brand href='/home'><img src={logo} alt='front_scgpd'/></Navbar.Brand >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown className='adrop' title="Cadastrar" id="navbarScrollingDropdown">
                        <NavDropdown.Item href ='/clientes/novocliente'><FaUsers/> Cadastrar Clientes</NavDropdown.Item>
                        <NavDropdown.Item href ='/veiculos/novoveiculo'><FaTruck/> Cadastrar Veiculos</NavDropdown.Item>
                        <NavDropdown.Item href ='/servicos/novoservico'><FaTools/> Cadastrar Serviço</NavDropdown.Item>
                        <NavDropdown.Item href ='/os/novaOs'><FaFileAlt/> Registrar Os's</NavDropdown.Item>
                        <NavDropdown.Item href ='/usuarios/novousuario'><FaUserFriends/> Cadastrar Usuários</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href='/home'><FaHome/> Home</Nav.Link>
                    
                    <Nav.Link href ='/clientes'><FaUsers/> Clientes</Nav.Link>
                    <Nav.Link href ='/veiculos'><FaTruck/> Veiculos</Nav.Link>
                    <Nav.Link href ='/servicos'><FaTools/> Serviços</Nav.Link>
                    <Nav.Link href ='/os'><FaFileAlt/> OS's</Nav.Link>
                    <Nav.Link href ='/pagamentos'><FaDollarSign/> Pagamentos</Nav.Link>
                    <Nav.Link href =''><FaUserFriends/> Usuários</Nav.Link>

                            
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
}

export default Navbarr