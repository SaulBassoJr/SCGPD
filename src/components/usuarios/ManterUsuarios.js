import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../layout/sectionLayout.css';
import {IoStopCircleSharp, IoSave} from 'react-icons/io5';

function ManterUsuarios(){
    return (       
        <section className='main_section -bgheight'>
            <h1>Cadastrar Usuário</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Nome</Form.Label>
                    <Form.Control type="name" placeholder="Nome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>*UserName</Form.Label>
                    <Form.Control type="name" placeholder="UserName" />
                </Form.Group>

                <Form.Group className="variantpar" controlId="formBasicEmail">
                    <div className="inputpar">
                        <div className='space'>
                            <Form.Label>*Senha</Form.Label>
                            <Form.Control type="text" placeholder="Senha" />
                        </div>
                        <div>
                            <Form.Label>*Confirme a Senha</Form.Label>
                            <Form.Control type="text" placeholder="Confirmação" />
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

export default ManterUsuarios;