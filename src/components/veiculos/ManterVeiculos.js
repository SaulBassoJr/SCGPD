import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import {IoStopCircleSharp, IoSave} from 'react-icons/io5';

function ManterVeiculos(){
    return (       
        <section className='main_section -bgheight'>
            <h1>Cadastrar Veículo</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Proprietario</Form.Label>
                    <Form.Control type="name" placeholder="Nome do proprietario" />
                </Form.Group>


                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Placa</Form.Label>
                            <Form.Control type="text" placeholder="Placa" />
                        </div>
                        <div>
                            <Form.Label>*Renavan</Form.Label>
                            <Form.Control type="text" placeholder="N° Renavan" />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className='inputpar'>
                        <div className='space'>
                            <Form.Label>*Marca</Form.Label>
                            <Form.Control type="tel" placeholder="Marca do veiculo" />
                        </div>

                        <div>
                            <Form.Label>*Modelo</Form.Label>
                            <Form.Control type="tel" placeholder="Modelo do veiculo" />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">                
                    <div className='inputpar'>
                        
                        <div className='space'>
                            <Form.Label>*Debitos</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Sim"
                                    name="group1"
                                    id="radioSim"
                                />
                                
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Não"
                                    name="group1"
                                    id="radioNao"
                                />
                            </div>
                        </div>

                        

                        <div>
                            <Form.Label>*Financiamento</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Sim"
                                    name="group2"
                                    id="radioSim"
                                />
                                
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Não"
                                    name="group2"
                                    id="radioNao"
                                />
                            </div>
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

export default ManterVeiculos;