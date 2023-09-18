import VeiculoDelete from './OsDelete'
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
    const [oss, setOss] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["placa", "renavam", "id"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const getOss = async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/Veiculo');
            const data = response.data;
            setOss(data);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOss();
    }, []);

    const data = Object.values(oss);

    function search(oss) {
        return oss.filter((os) => {
            if (filterParam == "All") {
                return searchParam.some((newOs) => {
                    return (
                        os[newOs]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    const removeOs = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7029/api/Veiculo/${id}`);
            const data = response.data;
            setOss(oss.filter((data) => data.id !== id));
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
                <h1> Registro de Os's</h1>
                <div className='buscador-styles'>
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
                        Os excluída com sucesso!
                    </Alert>
                )}

                <Table responsive bordered size="sm" >
                    <thead >
                        <tr>
                            <th>Proprietario</th>
                            <th>CPF</th>
                            <th>N° Celular</th>
                            <th>Placa do Veiculo</th>
                            <th>Modelo do Veiculo</th>
                            <th>Serviço Prestado</th>
                            <th>Valor Serviço</th>
                            <th>Data</th>
                            <th>Prazo</th>
                            <th>Data Venda</th>
                            <th>Data Vencimento</th>
                            <th>Converção MercoSul</th>
                            <th>Observações</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {search(data)?.map((os) =>
                            <tr key={os.id} >

                                <td>

                                    {/* {cliente.nome} */}

                                </td>
                                <td>
                                    {os.nome}

                                </td>
                                <td>

                                    {os.cpf}

                                </td>
                                <td>

                                    {os.ncelular}

                                </td>
                                <td>
                                    {os.placa}

                                </td>
                                <td>

                                    {os.modelo}

                                </td>
                                <td>

                                    {os.servico}

                                </td>
                                <td>

                                    {os.data}

                                </td>
                                <td>

                                    {os.prazo}

                                </td>
                                <td>

                                    {os.valorveiculo}

                                </td>
                                <td>

                                    {os.datavenda}

                                </td>
                                <td>

                                    {os.datavence}

                                </td>
                                <td>

                                    {os.convmercosul}

                                </td>
                                <td>
                                    <VeiculoDelete
                                        id={os.id}
                                        handleRemove={removeOs}
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