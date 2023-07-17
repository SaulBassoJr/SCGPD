import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import {IoStopCircleSharp, IoSave} from 'react-icons/io5';

function ManterClientes(){
    return (       
        <section className='main_section -bgheight'>
            <h1>Cadastrar Cliente</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Nome</Form.Label>
                    <Form.Control type="name" placeholder="Nome" />
                </Form.Group>


                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*CPF / CNPJ</Form.Label>
                            <Form.Control type="text" placeholder="Numero do CPF ou CNPJ" />
                        </div>
                        <div>
                            <Form.Label>RG</Form.Label>
                            <Form.Control type="text" placeholder="Numero do RG" />
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
                        <Form.Control type="text" placeholder="CEP"/>
                        </div>

                        <div className='space'>
                        <Form.Label>*Cidade</Form.Label>
                        <Form.Control type="text" placeholder="Cidade"/>
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
                            <Form.Control type="text" placeholder="Logradouro" />
                        </div>
                        <div>
                            <Form.Label>*Numero</Form.Label>
                            <Form.Control type="text" placeholder="Numero" />
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

export default ManterClientes;