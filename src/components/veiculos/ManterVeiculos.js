import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import '../layout/sectionLayout.css';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';

import InputMask from 'react-input-mask';
import { useState, useEffect } from "react";
import axios from "axios";

function ManterVeiculos() {
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
            const response = await axios.post('https://localhost:7029/SCGPD/Veiculo', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            navigate('/veiculos');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
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
        <section className='main_section'>
            <h1>Cadastrar Veículo</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Placa</Form.Label>
                            <InputMask
                                mask="aaa-9*99"
                                value={formData.placa}
                                onChange={(e) => handleInputChange(e, 'placa')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Placa"
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div>
                            <Form.Label>*Renavam</Form.Label>
                            <InputMask
                                mask="99999999999"
                                value={formData.renavam}
                                onChange={(e) => handleInputChange(e, 'renavam')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="N° Renavam"
                                    />
                                )}
                            </InputMask>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className='inputpar'>
                        <div className='space'>
                            <Form.Label>*Marca</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Marca do veiculo"
                                value={formData.marca}
                                onChange={(e) => handleInputChange(e, 'marca')}
                            />
                        </div>

                        <div>
                            <Form.Label>*Modelo</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Modelo do veiculo"
                                value={formData.modelo}
                                onChange={(e) => handleInputChange(e, 'modelo')}
                            />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className='inputpar'>

                        <div className='space'>
                            <Form.Label>*Debitos {renderHelpIcon('Marque "sim" caso exista algum débito do veículo como: Multas, documentação, impostos ou parcelas atrasadas')}</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Sim"
                                    name="group1"
                                    id="radioSim"
                                    value={formData.debitos}
                                    onChange={(e) => handleInputChange(e, 'debitos')}
                                />

                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Não"
                                    name="group1"
                                    id="radioNao"
                                    value={formData.debitos}
                                    onChange={(e) => handleInputChange(e, 'debitos')}

                                />
                            </div>
                        </div>



                        <div>
                            <Form.Label>*Financiamento {renderHelpIcon('Marque "sim" caso o veículo seja financiado')}</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Sim"
                                    name="group2"
                                    id="radioSim"
                                    value={formData.financiamento}
                                    onChange={(e) => handleInputChange(e, 'financiamento')}
                                />

                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Não"
                                    name="group2"
                                    id="radioNao"
                                    value={formData.financiamento}
                                    onChange={(e) => handleInputChange(e, 'financiamento')}
                                />
                            </div>
                        </div>

                    </div>
                </Form.Group>

                <Button variant="secondary" type="submit">
                    <IoSave />Salvar
                </Button>

                <Button variant="secondary" className="button-styles -cancel" type="button" href={'/home'}>
                    <IoStopCircleSharp /> Cancelar
                </Button>
            </Form>
        </section>
    )
}

export default ManterVeiculos;