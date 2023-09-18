import ServicoDelete from './ServicoDelete';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

import '../layout/button-styles.css';
import '../layout/buscador-styles.css'
import '../layout/sectionLayout.css';

function DisplayServicos() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [servicos, setServicos] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["nome"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const getServicos = async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/ServicoPrestado');
            const data = response.data;
            setServicos(data);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServicos();
    }, []);

    const data = Object.values(servicos);

    function search(servicos) {
        return servicos.filter((servico) => {
            if (filterParam == "All") {
                return searchParam.some((newServico) => {
                    return (
                        servico[newServico]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    const removeServico = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7029/api/ServicoPrestado/${id}`);
            const data = response.data;
            setServicos(servicos.filter((data) => data.id !== id));
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
                <h1> Lista de Serviços</h1>
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
                            <th>Serviço</th>
                            <th>Valor Despachante</th>
                            <th>Valor DETRAN</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {search(data)?.map((servico) =>
                            <tr key={servico.id} >

                                <td>

                                    {servico.nome}

                                </td>
                                <td>
                                    {servico.valordesp}

                                </td>
                                <td>

                                    {servico.valordetran}

                                </td>
                                <td>
                                    <ServicoDelete
                                        id={servico.id}
                                        handleRemove={removeServico}
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

export default DisplayServicos;