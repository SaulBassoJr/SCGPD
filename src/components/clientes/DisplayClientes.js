import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../layout/sectionLayout.css';
import {IoPencilOutline, IoTrashOutline} from 'react-icons/io5';

function DisplayClientes(){
    return (       
        <section responsive className='main_section -exib'>
            <h1>Clientes</h1>

            <Table striped responsive="sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF/CNPJ</th>
                        <th>RG</th>
                        <th>N° Telefone</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Bairro</th>
                        <th>Logradouro</th>
                        <th>Numero</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Saul Basso Junior</td>
                        <td>111520020-20</td>
                        <td>123123214</td>
                        <td>42999447690</td>
                        <td>Pirai do Sul</td>
                        <td>PR</td>
                        <td>Campo do Aterrado</td>
                        <td>Sitio São Miguel</td>
                        <td>sn</td>
                        <td>
                            <Button inline variant="primary" type="submit">
                                <IoPencilOutline/>
                            </Button>

                            <Button inline variant="danger" type="submit">
                                <IoTrashOutline/>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Saul Basso Junior</td>
                        <td>111520020-20</td>
                        <td>123123214</td>
                        <td>42999447690</td>
                        <td>Pirai do Sul</td>
                        <td>PR</td>
                        <td>Campo do Aterrado</td>
                        <td>Sitio São Miguel</td>
                        <td>sn</td>
                        <td>
                            <Button inline variant="primary" type="submit">
                                <IoPencilOutline/>
                            </Button>

                            <Button inline variant="danger" type="submit">
                                <IoTrashOutline/>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Saul Basso Junior</td>
                        <td>111520020-20</td>
                        <td>123123214</td>
                        <td>42999447690</td>
                        <td>Pirai do Sul</td>
                        <td>PR</td>
                        <td>Campo do Aterrado</td>
                        <td>Sitio São Miguel</td>
                        <td>sn</td>
                        <td>
                            <Button inline variant="primary" type="submit">
                                <IoPencilOutline/>
                            </Button>

                            <Button inline variant="danger" type="submit">
                                <IoTrashOutline/>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
        </section>
    )
}

export default DisplayClientes;