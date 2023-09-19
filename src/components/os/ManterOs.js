import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';
import axios from 'axios';

function ManterOs() {
    const [formData, setFormData] = useState({
        cliente: {
            id: null,
            nome: '',
            cpf: '',
            telefone: '',
        },
        veiculo: {
            placa: '',
            modelo: '',
        },
        servicoPrestado: {
            valorDespachante: '',
            valorDETRAN: '',
        },
        pagamentos: [
            {
                id: 1, // Change this to the appropriate payment ID
                formaDePagamento: {
                    id: 2, // Change this to the appropriate formaDePagamento ID
                    nome: 'string',
                },
            },
        ],
        dataCriacao: '',
        prazo: '',
        valorVeiculo: '',
        dataVenda: '',
        dataVencimento: '',
        conversaoMercosul: false,
        observacoes: '',
    });

    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [servicosPrestados, setServicosPrestados] = useState([]);
    const [formasDePagamento, setFormasDePagamento] = useState([]);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const [clientesRes, veiculosRes, servicosRes, formasPagamentoRes] = await Promise.all([
                    axios.get('https://localhost:7029/SCGPD/Cliente'),
                    axios.get('https://localhost:7029/SCGPD/Veiculo'),
                    axios.get('https://localhost:7029/SCGPD/ServicoPrestado'),
                    axios.get('https://localhost:7029/SCGPD/FormaDePagamento'),
                ]);

                setClientes(clientesRes.data);
                setVeiculos(veiculosRes.data);
                setServicosPrestados(servicosRes.data);
                setFormasDePagamento(formasPagamentoRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleClientChange = (clientId) => {
        const selectedClient = clientes.find((cliente) => cliente.id === clientId);

        setFormData((prevFormData) => ({
            ...prevFormData,
            cliente: {
                ...prevFormData.cliente,
                ...selectedClient,
            },
        }));
    };

    const handleServicoChange = (servicoId) => {
        const selectedServico = servicosPrestados.find((servico) => servico.id === servicoId);

        if (selectedServico) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                servicoPrestado: {
                    ...prevFormData.servicoPrestado,
                    ...selectedServico,
                },
            }));
        }
    };

    const handlePlateChange = (plateNumber) => {
        const selectedVehicle = veiculos.find((veiculo) => veiculo.placa === plateNumber);

        if (selectedVehicle) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                veiculo: {
                    ...prevFormData.veiculo,
                    ...selectedVehicle,
                },
            }));
        }
    };

    const handlePagamentoChange = (pagamentoId, formaDePagamentoId) => {
        const updatedPagamentos = formData.pagamentos.map((pagamento) => {
            if (pagamento.id === pagamentoId) {
                return {
                    ...pagamento,
                    formaDePagamento: {
                        id: formaDePagamentoId,
                        nome: formasDePagamento.find((forma) => forma.id === formaDePagamentoId).nome,
                    },
                };
            }
            return pagamento;
        });

        setFormData((prevFormData) => ({
            ...prevFormData,
            pagamentos: updatedPagamentos,
        }));
    };

    const handleInputChange = (e, fieldName) => {
        const { value, type } = e.target;
        let updatedValue;

        if (type === 'radio') {
            updatedValue = e.target.id === 'radioSim';
        } else {
            updatedValue = value;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: updatedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7029/SCGPD/OrdemDeServico', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Ordem de serviço registrada com sucesso:', response.data);
            // Navigate to the desired page after successful submission
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <section className='main_section -bgheight'>
            <h1>Registrar Ordem de Serviço</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Proprietario</Form.Label>
                    <Form.Select
                        type="text"
                        placeholder="Nome"
                        value={formData.cliente.id || ''}
                        onChange={(e) => handleClientChange(parseInt(e.target.value, 10))}>
                        <option>Selecione...</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                        ))}

                    </Form.Select>
                </Form.Group>


                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className="space">
                            <Form.Label>*CPF</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero do CPF"
                                value={formData.cliente.cpf || ''}
                                onChange={(e) => {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        cliente: {
                                            ...prevFormData.cliente,
                                            cpf: e.target.value
                                        }
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <Form.Label>*N° Telefone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Numero de telefone"
                                value={formData.cliente.telefone || ''}
                                onChange={(e) => {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        cliente: {
                                            ...prevFormData.cliente,
                                            telefone: e.target.value
                                        }
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Placa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Placa"
                                value={formData.veiculo.placa}
                                onChange={(e) => {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        veiculo: {
                                            ...prevFormData.veiculo,
                                            placa: e.target.value
                                        }
                                    }));
                                    handlePlateChange(e.target.value);
                                }}
                            />
                        </div>

                        <div>
                            <Form.Label>*Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Modelo do veiculo"
                                value={formData.veiculo.modelo || ''}
                                onChange={(e) => {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        veiculo: {
                                            ...prevFormData.veiculo,
                                            modelo: e.target.value
                                        }
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>*Serviço prestado</Form.Label>
                    <Form.Select
                        type="text"
                        placeholder="Nome"
                        value={formData.servicoPrestado.id || ''}
                        onChange={(e) => handleServicoChange(parseInt(e.target.value, 10))}>
                        <option>Selecione...</option>
                        {servicosPrestados.map(servicoPrestado => (
                            <option key={servicoPrestado.id} value={servicoPrestado.id}>{servicoPrestado.nome}</option>
                        ))}

                    </Form.Select>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Valor Serviço(s)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Valor"
                                value={formData.servicoPrestado.valorDespachante + formData.servicoPrestado.valorDETRAN || ''}
                                onChange={(e) => {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        servicoPrestado: {
                                            ...prevFormData.servicoPrestado,
                                            valorDespachante: e.target.value
                                        }
                                    }));
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        servicoPrestado: {
                                            ...prevFormData.servicoPrestado,
                                            valorDETRAN: e.target.value
                                        }
                                    }));
                                }}

                            />
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
                                value={formData.valorVeiculo}
                                onChange={(e) => handleInputChange(e, 'valorVeiculo')}
                            />
                        </div>

                        <div className="space">
                            <Form.Label>Data venda</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.dataVenda}
                                onChange={(e) => handleInputChange(e, 'dataVenda')}
                            />
                        </div>

                        <div>
                            <Form.Label>Data Vencimento</Form.Label>
                            <Form.Control
                                type="date"
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Forma de pagamento</Form.Label>
                    <Form.Select
                        type="text"
                        placeholder="Nome"
                        value={formData.pagamentos[0].formaDePagamento ? formData.pagamentos[0].formaDePagamento.id : ''}
                        onChange={(e) => handlePagamentoChange(formData.pagamentos[0].id, parseInt(e.target.value, 10))}
                    >
                        {formasDePagamento.map((formaDePagamento) => (
                            <option key={formaDePagamento.id} value={formaDePagamento.id}>
                                {formaDePagamento.nome}
                            </option>
                        ))}
                    </Form.Select>
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
    );
}

export default ManterOs;
