import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import {IoStopCircleSharp, IoSave} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function ManterServico(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7029/SCGPD/ServicoPrestado/${id}`);
                const { data } = response;
                setFormData(data);
            } catch (error) {
                console.error('Erro ao obter os dados existentes:', error);
            }
        };
        fetchData();
    }, [id]);

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
            const response = await axios.put(`https://localhost:7029/SCGPD/ServicoPrestado/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            navigate('/servicos');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }

    };

    return (       
        <section className='main_section'>
            <h1>Editar Serviço</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Serviço</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Serviço prestado"
                        value={formData.nome}
                        onChange={(e) => handleInputChange(e, 'nome')}
                    />
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Valor Despachante</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Valor"
                                value={formData.valorDespachante}
                                onChange={(e) => handleInputChange(e, 'valorDespachante')}
                            />
                        </div>
                        <div>
                            <Form.Label>*Valor DETRAN</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Valor" 
                                value={formData.valorDETRAN}
                                onChange={(e) => handleInputChange(e, 'valorDETRAN')}
                            />
                        </div>
                    </div>
                </Form.Group>
                
                <Button variant="secondary" type="submit">
                   <IoSave/>Salvar
                </Button>

                <Button variant="secondary" className="button-styles -cancel" type='button' href={'/servicos'}>
                   <IoStopCircleSharp/> Cancelar
                </Button>
            </Form>
        </section>
    )
}

export default ManterServico;