import VeiculoDelete from './VeiculoDelete'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

import '../layout/button-styles.css';
import '../layout/buscador-styles.css'
import '../layout/sectionLayout.css';

function DisplayVeiculos() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [veiculos, setVeiculos] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["placa", "renavam", "id"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const getVeiculos = async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/Veiculo');
            const data = response.data;
            setVeiculos(data);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getVeiculos();
    }, []);

    const data = Object.values(veiculos);

    function search(veiculos) {
        return veiculos.filter((veiculo) => {
            if (filterParam == "All") {
                return searchParam.some((newVeiculo) => {
                    return (
                        veiculo[newVeiculo]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    const removeVeiculo = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7029/api/Veiculo/${id}`);
            const data = response.data;
            setVeiculos(veiculos.filter((data) => data.id !== id));
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
                <h1> Lista de Veiculos</h1>
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
                        Veiculo excluído com sucesso!
                    </Alert>
                )}

                <Table responsive bordered size="sm" >
                    <thead >
                        <tr>
                            <th>Proprietario</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Placa</th>
                            <th>Renavam</th>
                            <th>Debitos</th>
                            <th>Financiamento</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {search(data)?.map((veiculo) =>
                            <tr key={veiculo.id} >

                                <td>

                                    {/* {cliente.nome} */}

                                </td>
                                <td>
                                    {veiculo.marca}

                                </td>
                                <td>

                                    {veiculo.modelo}

                                </td>
                                <td>

                                    {veiculo.placa}

                                </td>
                                <td>
                                    {veiculo.renavam}

                                </td>
                                <td>

                                    {veiculo.debito}

                                </td>
                                <td>

                                    {veiculo.financiamento}

                                </td>
                                <td>
                                    <VeiculoDelete
                                        id={veiculo.id}
                                        handleRemove={removeVeiculo}
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

export default DisplayVeiculos;