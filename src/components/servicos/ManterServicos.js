import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import {IoStopCircleSharp, IoSave} from 'react-icons/io5';

function ManterServicos(){
    return (       
        <section className='main_section'>
            <h1>Cadastrar Serviço</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Serviço</Form.Label>
                    <Form.Control type="name" placeholder="Serviço prestado" />
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Valor Despachante</Form.Label>
                            <Form.Control type="text" placeholder="Valor" />
                        </div>
                        <div>
                            <Form.Label>*Valor DETRAN</Form.Label>
                            <Form.Control type="text" placeholder="Valor" />
                        </div>
                    </div>
                </Form.Group>
                
                <Button variant="secondary" type="submit">
                   <IoSave/>Salvar
                </Button>

                <Button variant="secondary" type="submit">
                   <IoStopCircleSharp/> Cancelar
                </Button>
            </Form>
        </section>
    )
}

export default ManterServicos;