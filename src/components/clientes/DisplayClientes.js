import Button from 'react-bootstrap/Button';
import ClienteDelete from './ClienteDelete'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

import '../layout/button-styles.css';
import '../layout/buscador-styles.css'
import '../layout/sectionLayout.css';

function DisplayClientes() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clientes, setClientes] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["nome", "cpf", "id"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    // axios.get('')
    //     .then(response =>{

    //     }, error => {
    //         console.log(error);
    //     });

    const getClientes = async () => {
        try {
            const response = await axios.get('https://localhost:7029/SCGPD/Cliente');
            const data = response.data;
            setClientes(data);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    const data = Object.values(clientes);

    function search(clientes) {
        return clientes.filter((cliente) => {
            if (filterParam == "All") {
                return searchParam.some((newCliente) => {
                    return (
                        cliente[newCliente]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    const removeCliente = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7029/SCGPD/Cliente/${id}`);
            const data = response.data;
            setClientes(clientes.filter((data) => data.id !== id));
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <section className='main_section -exib'>
                <h1> Lista de Clientes</h1>
                <div className='buscador-styles'>
                    {/* <div className='buscador-icon'><FaSearch/></div> */}
                    <Form.Control
                        type="search"
                        name="search-form"
                        id="search-form"
                        placeholder="Busca"
                        className="me-2"
                        aria-label="Search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />

                </div>
                {/* Exibe a mensagem de sucesso se showSuccessAlert for true */}
                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Cliente excluído com sucesso!
                    </Alert>
                )}

                <Table responsive bordered size="sm" >
                    <thead >
                        <tr>
                            <th>Nome</th>
                            <th>Genêro</th>
                            <th>CPF</th>
                            <th>RG</th>
                            <th>Endereço</th>
                            <th>Numero</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {search(data)?.map((cliente) =>
                            <tr key={cliente.id} >

                                <td>

                                    {cliente.nome}

                                </td>
                                <td>
                                    {cliente.genero}

                                </td>
                                <td>

                                    {cliente.cpf}

                                </td>
                                <td>

                                    {cliente.rg}

                                </td>
                                <td>
                                    {cliente.endereco}

                                </td>
                                <td>

                                    {cliente.numero}

                                </td>
                                <td>

                                    {cliente.bairro}

                                </td>
                                <td>

                                    {cliente.cidade}

                                </td>
                                <td>

                                    {cliente.uf}

                                </td>
                                <td>
                                    <ClienteDelete
                                        id={cliente.id}
                                        handleRemove={removeCliente}
                                    />

                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>

            </section>
        )
    }
}

export default DisplayClientes;