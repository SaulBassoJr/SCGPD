import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useState, useEffect } from "react";
import axios from "axios";

function ManterOs() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const handleInputChange = (e, fieldName) => {
        const { value, type } = e.target;
        let updatedValue;

        if (type === 'radio') {
            updatedValue = e.target.id === 'radioSim' ? true : false;
        } else {
            updatedValue = value;
        }
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar os dados para a API usando axios
        try {
            const response = await axios.post('https://localhost:7029/SCGPD/OrdemDeServico', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            navigate('/os');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }

    };

    return (
        <section className='main_section -bgheight'>
            <h1>Registrar Ordem de Serviço</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Proprietario</Form.Label>
                    <Form.Control type="name" placeholder="Nome" />
                </Form.Group>


                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className="space">
                            <Form.Label>*CPF / CNPJ</Form.Label>
                            <Form.Control type="text" placeholder="Numero do CPF ou CNPJ" />
                        </div>

                        <div>
                            <Form.Label>*N° Telefone</Form.Label>
                            <Form.Control type="tel" placeholder="Numero de telefone" />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Placa</Form.Label>
                            <Form.Control type="text" placeholder="Placa" />
                        </div>

                        <div>
                            <Form.Label>*Modelo</Form.Label>
                            <Form.Control type="text" placeholder="Modelo do veiculo" />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>*Serviço prestado</Form.Label>
                    <Form.Select type='checkbox'>
                        <option>Selecione</option>
                        <option>Comucação de venda</option>
                        <option>Primeiro emplacamento</option>
                        <option>Outro</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Valor Serviço(s)</Form.Label>
                            <Form.Control type="text" placeholder="Valor" />
                        </div>

                        <div className='space'>
                            <Form.Label>*Data</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.dataCriacao}
                                onChange={(e) => handleInputChange(e, 'dataCriacao')}
                            />
                        </div>

                        <div>
                            <Form.Label>*Prazo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Dias"
                                value={formData.prazo}
                                onChange={(e) => handleInputChange(e, 'prazo')}
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className="space">
                            <Form.Label>Valor Veiculo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Valor"
                                disabled
                                value={formData.valorVeiculo}
                                onChange={(e) => handleInputChange(e, 'valorVeiculo')}
                            />
                        </div>

                        <div className="space">
                            <Form.Label>Data venda</Form.Label>
                            <Form.Control
                                type="date"
                                disabled
                                value={formData.dataVenda}
                                onChange={(e) => handleInputChange(e, 'dataVenda')}
                            />
                        </div>

                        <div>
                            <Form.Label>Data Vencimento</Form.Label>
                            <Form.Control
                                type="date"
                                disabled
                                value={formData.dataVencimento}
                                onChange={(e) => handleInputChange(e, 'dataVencimento')}
                            />
                        </div>
                    </div>

                    <Form.Text id="valor-veiculo" muted>
                        Campos obrigatórios apenas para comunicação de venda!
                    </Form.Text>

                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div>

                        <div className='space'>
                            <Form.Label>*Conversão MercoSul</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Sim"
                                    name="group1"
                                    id="radioSim"
                                    value={formData.conversaoMercosul}
                                    onChange={(e) => handleInputChange(e, 'conversaoMercosul')}
                                />

                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Não"
                                    name="group1"
                                    id="radioNao"
                                    value={formData.conversaoMercosul}
                                    onChange={(e) => handleInputChange(e, 'conversaoMercosul')}
                                />
                            </div>
                        </div>

                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Textarea1">
                    <Form.Label>Observações:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        value={formData.observacoes}
                        onChange={(e) => handleInputChange(e, 'observacoes')}
                    />
                </Form.Group>

                <Button variant="secondary" type="submit">
                    <IoSave />Salvar
                </Button>

                <Button variant="secondary" className="button-styles -cancel" type="button" href={'/'}>
                    <IoStopCircleSharp /> Cancelar
                </Button>

            </Form>
        </section>
    )
}

export default ManterOs;