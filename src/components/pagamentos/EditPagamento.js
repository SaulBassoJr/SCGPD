import Button from 'react-bootstrap/Button';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import { IoStopCircleSharp, IoSave } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function EditPagamento() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7029/SCGPD/Pagamento/ID_${id}`);
                const { data } = response;
                setFormData(data);
                console.log('FormData:', formData);
            } catch (error) {
                console.error('Erro ao obter os dados existentes:', error);
            }
        };
        fetchData();
    }, [id]);

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
            const response = await axios.put(`https://localhost:7029/SCGPD/Pagamento/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            navigate('/pagamentos');
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
            <h1>Editar Pagamento</h1>
            <Form className="diveditPag" onSubmit={handleSubmit}>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div >

                        <div className='space'>
                            <Form.Label>*Status do Pagamento {renderHelpIcon('Marque "sim" caso exista algum débito do veículo como: Multas, documentação, impostos ou parcelas atrasadas')}</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Pago"
                                    name="group1"
                                    id="radioSim"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange(e, 'status')}
                                />

                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Não Pago"
                                    name="group1"
                                    id="radioNao"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange(e, 'status')}

                                />
                            </div>
                        </div>

                    </div>
                </Form.Group>

                <Button variant="secondary" type="submit">
                    <IoSave />Salvar
                </Button>

                <Button variant="secondary" className="button-styles -cancel" type='button' href={'/pagamentos'}>
                    <IoStopCircleSharp /> Cancelar
                </Button>
            </Form>
        </section>
    )
}

export default EditPagamento;