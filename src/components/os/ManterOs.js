import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import {IoStopCircleSharp, IoSave} from 'react-icons/io5';

function ManterOs(){
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
                            <Form.Control type="date"/>
                        </div>

                        <div>
                            <Form.Label>*Prazo</Form.Label>
                            <Form.Control type="number" placeholder="Dias" />
                        </div>                     
                    </div>   
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className="space">
                        <Form.Label>Valor Veiculo</Form.Label>
                        <Form.Control type="text" placeholder="Valor" disabled />
                        </div>

                        <div className="space">
                        <Form.Label>Data venda</Form.Label>
                        <Form.Control type="date" disabled />
                        </div>

                        <div>
                        <Form.Label>Data Vencimento</Form.Label>
                        <Form.Control type="date" disabled/>
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

                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Textarea1">
                    <Form.Label>Observações:</Form.Label>
                    <Form.Control as="textarea" rows={3} />
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

export default ManterOs;