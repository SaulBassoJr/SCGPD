import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';

import { useState, useEffect } from "react";
import axios from "axios";

function ManterClientes() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [response, setResponse] = useState([]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };
    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar os dados para a API usando axios
        try {
            const response = await axios.post('https://localhost:7029/SCGPD/Cliente', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            navigate('/clientes');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            if (error.response) {
                // O servidor respondeu com um código de status fora do intervalo de 2xx
                console.log('Data da resposta:', error.response.data);
                console.log('Status da resposta:', error.response.status);
                console.log('Headers da resposta:', error.response.headers);
            } else if (error.request) {
                // A requisição foi feita, mas não houve resposta
                console.log('Requisição feita, mas não houve resposta:', error.request);
            } else {
                // Algo aconteceu durante a configuração da requisição que causou o erro
                console.log('Erro ao configurar a requisição:', error.message);
            }
        }
    
    };





    return (
        <section className='main_section -bgheight'>
            <h1>Cadastrar Cliente</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>*Nome</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange(e, 'nome')}
                    />
                </Form.Group>


                <Form.Group className="variantpar" controlId="formCPF">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*CPF / CNPJ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero do CPF ou CNPJ"
                                value={formData.cpf}
                                onChange={(e) => handleInputChange(e, 'cpf')}
                            />
                        </div>
                        <div>
                            <Form.Label>RG</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero do RG"
                                value={formData.rg}
                                onChange={(e) => handleInputChange(e, 'rg')}
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className='inputpar'>
                        <div className='space'>
                            <Form.Label>*N° Telefone</Form.Label>
                            <Form.Control type="tel" placeholder="Numero de telefone" />
                        </div>

                        <div>
                            <Form.Label>*Gênero</Form.Label>
                            <Form.Select type='checkbox'>
                                <option>Selecione</option>
                                <option>M</option>
                                <option>F</option>
                                <option>Outro</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CEP"
                                value={formData.cep}
                                onChange={(e) => handleInputChange(e, 'cep')}
                            />
                        </div>

                        <div className='space'>
                            <Form.Label>*Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                value={formData.cidade}
                                onChange={(e) => handleInputChange(e, 'cidade')}
                            />
                        </div>

                        <div >
                            <Form.Label>*UF</Form.Label>
                            <Form.Select type='checkbox'>
                                <option>Selecione</option>
                                <option>M</option>
                                <option>F</option>
                                <option>Outro</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Bairro</Form.Label>
                            <Form.Control type="text" placeholder="Bairro" />
                        </div>
                        <div className='space'>
                            <Form.Label>*Logradouro</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Logradouro"
                                value={formData.endereco}
                                onChange={(e) => handleInputChange(e, 'endereco')}
                            />
                        </div>
                        <div>
                            <Form.Label>*Numero</Form.Label>
                            <Form.Control type="text" placeholder="Numero" />
                        </div>
                    </div>
                </Form.Group>

                <Button variant="secondary"  type='submit'> 
                    <IoSave />Salvar
                </Button>

                <Button variant="secondary" className="button-styles -cancel" type='button' href={'/clientes'}>
                    <IoStopCircleSharp /> Cancelar
                </Button>
            </Form>
        </section>
    )
}

export default ManterClientes;