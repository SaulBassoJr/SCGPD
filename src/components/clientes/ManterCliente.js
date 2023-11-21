import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import '../layout/sectionLayout.css';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function ManterCliente() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ });

    const [showInvalidCpfAlert, setShowInvalidCpfAlert] = useState(false);
    const [showInvalidRgAlert, setShowInvalidRgAlert] = useState(false);

    const [uf, setUf] = useState([]);
    const [listUf, setListUf] = useState([]);
    const [city, setCity] = useState([]);
    const [listCity, setListCity] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7029/SCGPD/Cliente/ID_${id}`);
                const { data } = response;
                setFormData(data);
            } catch (error) {
                console.error('Erro ao obter os dados existentes:', error);
            }
        };
        fetchData();
    }, [id]);

    function loadUf() {
        let url = 'https://servicodados.ibge.gov.br/';
        url = url + 'api/v1/localidades/estados';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListUf([...data]);
            });
    }
    function loadCity(id) {
        let url = 'https://servicodados.ibge.gov.br/api/v1/';
        url = url + `localidades/estados/${id}/municipios`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListCity([...data]);
            });
    }
    useEffect(() => {
        loadUf();
    }, []);
    useEffect(() => {
        if (uf) {
            loadCity(uf);
        }
    }, [uf]);

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
            const response = await axios.put(`https://localhost:7029/SCGPD/Cliente/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            navigate('/clientes');
        } catch (error) {
            if (error.response && error.response.data === "O CPF " + formData.cpf + " é inválido") {
                setShowInvalidCpfAlert(true);
                setTimeout(() => {
                    setShowInvalidCpfAlert(false);
                }, 5000);
            } 
            if (error.response && error.response.data === "O RG " + formData.rg + " é inválido") {
                setShowInvalidRgAlert(true);
                setTimeout(() => {
                    setShowInvalidRgAlert(false);
                }, 5000);
            } else {
                console.log(error);
            }
        }

    };

    function renderHelpIcon(text) {
        return (
          <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={
                <Popover id="popover-basic" className='help-text'>{text}</Popover>
            }
          >
            <span className="help-icon">?</span>
          </OverlayTrigger>
        );
      }



    return (
        <section className='main_section -bgheight'>
            <h1>Editar Cliente</h1>
            {showInvalidCpfAlert && (
                <Alert variant="warning" onClose={() => setShowInvalidCpfAlert(false)} dismissible>
                    O CPF " {formData.cpf} "  é inválido.
                </Alert>
            )}
            {showInvalidRgAlert && (
                <Alert variant="warning" onClose={() => setShowInvalidRgAlert(false)} dismissible>
                    O RG " {formData.rg} "  é inválido.
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>*Nome</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Nome Completo"
                        maxLength="100"
                        value={formData.nome}
                        onChange={(e) => handleInputChange(e, 'nome')}
                    />
                </Form.Group>

                <Form.Group className="variantpar" controlId="formCPF">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*CPF</Form.Label>
                            <InputMask
                                mask='999.999.999-99'

                                value={formData.cpf}
                                onChange={(e) => handleInputChange(e, 'cpf')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Numero do CPF"
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div>
                            <Form.Label>RG</Form.Label>
                            <InputMask
                                mask="99.999.999-9"
                                value={formData.rg}
                                onChange={(e) => handleInputChange(e, 'rg')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Numero do RG"
                                    />
                                )}
                            </InputMask>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className='inputpar'>
                        <div className='space'>
                            <Form.Label>*N° Telefone</Form.Label>
                            <InputMask
                                mask='(99) 9 9999-9999'
                                value={formData.telefone}
                                onChange={(e) => handleInputChange(e, 'telefone')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Numero do Telefone-Celular"
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div>
                            <Form.Label>*Gênero</Form.Label>
                            <Form.Select type='checkbox' 
                            value={formData.genero}
                            onChange={(e) => handleInputChange(e, 'genero')}   
                            >
                                <option>Selecione</option>
                                <option>M</option>
                                <option>F</option>
                                <option>O</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*CEP</Form.Label>
                            <InputMask
                                mask="99.999-999"
                                maskChar="_"
                                value={formData.cep}
                                onChange={(e) => handleInputChange(e, 'cep')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Insira o CEP"
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div className='space'>
                            <Form.Label>*UF</Form.Label>
                            <Form.Select
                                type='checkbox'
                                value={formData.uf}
                                onChange={(e) => {setUf(e.target.value); handleInputChange(e, 'uf') }}
                                name="uf_id"
                            >
                                <option>Selecione...</option>
                                {listUf.map((a, b) => (
                                    <option value={a.sigla}>{a.sigla}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div>
                            <Form.Label>*Cidade</Form.Label>
                            <Form.Select
                                type='checkbox'
                                placeholder="Cidade"
                                value={formData.cidade}
                                onChange={(e) => {setCity(e.target.value); handleInputChange(e, 'cidade') }}
                                name="city_id"
                            >
                                <option>Selecione...</option>
                                {listCity.map((a, b) => (
                                    <option value={a.sigla}>{a.nome}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Bairro</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Bairro"
                            value={formData.bairro} 
                            onChange={(e) => handleInputChange(e, 'bairro')}
                            />
                        </div>
                        <div className='space'>
                            <Form.Label>*Logradouro {renderHelpIcon('Insira o nome da Rua e complemento (se existir) Ex: Rua Ficção, bloco xx, apto xx.')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Logradouro"
                                value={formData.endereco}
                                onChange={(e) => handleInputChange(e, 'endereco')}
                            />
                        </div>
                        <div>
                            <Form.Label>*Numero</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero"
                                value={formData.numero}
                                onChange={(e) => handleInputChange(e, 'numero')} 
                            />
                        </div>
                    </div>
                </Form.Group>

                <Button variant="secondary" type='submit'>
                    <IoSave />Salvar
                </Button>

                <Button variant="secondary" className="button-styles -cancel" type='button' href={'/clientes'}>
                    <IoStopCircleSharp /> Cancelar
                </Button>
            </Form>
        </section>
    )
}

export default ManterCliente;