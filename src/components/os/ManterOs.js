import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';
import axios from 'axios';

function ManterOs() {
    const navigate = useNavigate();
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
            valorDespachante: 0,
            valorDETRAN: 0,
        },
        pagamento: {
            id: 0, // Change this to the appropriate payment ID
            formaDePagamento: "",
            valor: 0,
        },
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
    const [Pagamentos, setPagamentos] = useState([]);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const [clientesRes, veiculosRes, servicosRes, PagamentosRes] = await Promise.all([
                    axios.get('https://localhost:7029/SCGPD/Cliente'),
                    axios.get('https://localhost:7029/SCGPD/Veiculo'),
                    axios.get('https://localhost:7029/SCGPD/ServicoPrestado'),
                    axios.get('https://localhost:7029/SCGPD/Pagamento'),
                ]);

                setClientes(clientesRes.data);
                setVeiculos(veiculosRes.data);
                setServicosPrestados(servicosRes.data);
                setPagamentos(PagamentosRes.data);
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

    const handleInputChange = (e, fieldName) => {
        const { value, type } = e.target;
        let updatedValue = value;

        if (type === 'radio') {
            updatedValue = e.target.id === 'radioSim';
        } else if (fieldName === 'valorDespachante' || fieldName === 'valorDETRAN') {
            // Se os campos forem relacionados aos valores do serviço, atualize diretamente o valor
            updatedValue = parseFloat(value || 0); // Garante que o valor seja um número
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: updatedValue,
        }));
    };

    const handlePagamentoChange = (formaDePagamentoSelecionada) => {
        const valorServico = parseFloat(formData.servicoPrestado.valorDespachante || 0) + parseFloat(formData.servicoPrestado.valorDETRAN || 0);

        const updatedPagamento = {
            ...formData.pagamento,
            valor: valorServico.toFixed(2),
            formaDePagamento: formaDePagamentoSelecionada,
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            pagamento: updatedPagamento,
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
            navigate('/os');
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
                                value={(typeof formData.servicoPrestado.valorDespachante === 'number' && typeof formData.servicoPrestado.valorDETRAN === 'number')
                                    ? (formData.servicoPrestado.valorDespachante + formData.servicoPrestado.valorDETRAN).toFixed(2)
                                    : ''}
                                onChange={(e) => {
                                    handleInputChange(e, 'valorDespachante');
                                    handleInputChange(e, 'valorDETRAN');
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
                        onChange={(e) => {
                            const selectedFormaDePagamento = e.target.value;
                            handlePagamentoChange(selectedFormaDePagamento);
                        }}
                    >
                        <option>Selecione...</option>
                        <option>Crédito</option>
                        <option>Débito</option>
                        <option>Dinheiro</option>
                        <option>Pix</option>
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

                <Button variant="secondary" className="button-styles -cancel" type="button" href={'/home'}>
                    <IoStopCircleSharp /> Cancelar
                </Button>

            </Form>
        </section>
    );
}

export default ManterOs;