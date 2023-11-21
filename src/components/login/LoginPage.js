import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from "axios";

import './loginContainer.css'
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
    // const { LoginPage } = useAuth();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    // const { login } = useAuth(); // Use o hook useAuth para acessar a função login

    // const handleLogin = async () => {
    //     try {
    //       const response = await axios.post('URL_DA_SUA_API_PARA_LOGIN', {
    //         userName,
    //         senha,
    //       });
      
    //       // Supondo que a resposta contenha o ID do usuário como token de autenticação
    //       const userId = response.data.id;
      
    //       // Armazenar o ID do usuário no localStorage
    //       localStorage.setItem('userId', userId);
      
    //       // Chamar a função de login do contexto de autenticação
    //       login();
      
    //       // Redirecionar para a página inicial após o login
    //       navigate('/home');
    //     } catch (error) {
    //       setError('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
    //     }
    //   };


    return (
        <section className='loginContainer' >
            <div className="divLogin">
                <h1> LOGIN </h1>
                <Form className="backlogin">
                    <Form.Group>
                        <Form.Label className="loginLabel">*Nome de usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu nome de usuário"
                            value={userName}
                            onChange={(e) => [setUserName(e.target.value), setError("")]}
                        />

                        <Form.Label className="loginLabel">*Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua Senha"
                            value={senha}
                            onChange={(e) => [setSenha(e.target.value), setError("")]}
                        />

                        <Button className="loginButton" > Entrar </Button>

                        <Link className="linkLogin" to="/">Esqueceu a senha?</Link>
                    </Form.Group>
                </Form>
            </div>
        </section>
    );
}

export default LoginPage;