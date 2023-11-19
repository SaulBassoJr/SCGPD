import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import './loginContainer.css'

function LoginPage() {
    // const { LoginPage } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    // const handleLogin = () => {
    //     if (!email | !senha) {
    //         setError("Preencha todos os campos");
    //         return;
    //     }

    //     const res = LoginPage(email, senha);

    //     if (res) {
    //         setError(res);
    //         return;
    //     }

    //     navigate("/H");
    // };

    return (
        <section className='loginContainer' >
            <div className="divLogin">
            <h1> LOGIN </h1>
            <Form className="backlogin">
                <Form.Group>
                    <Form.Label className="loginLabel">*Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />

                    <Form.Label className="loginLabel">*Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua Senha"
                        value={senha}
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />

                    <Button className="loginButton"> Entrar </Button>

                    <Link className="linkLogin" to="/">Esqueceu a senha?</Link>
                </Form.Group>
            </Form>
            </div>
        </section>
    );
}

export default LoginPage;