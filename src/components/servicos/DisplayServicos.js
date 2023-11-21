import Button from 'react-bootstrap/Button';
import ServicoDelete from './ServicoDelete';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import '../layout/button-styles.css';
import '../layout/buscador-styles.css'
import '../layout/sectionLayout.css';
import '../layout/table.css';

function DisplayServicos() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [servicos, setServicos] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showAvisoAlert, setShowAvisoAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["nome"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const getServicos = async () => {
        try {
            const response = await axios.get('https://localhost:7029/SCGPD/ServicoPrestado');
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

    // Lógica para paginar os dados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(data).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(search(data).length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderTableRows = () => {
        return currentItems.map((servico) => (
            <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td className="text-end">R${servico.valorDespachante.toFixed(2)}</td>
                <td className="text-end">R${servico.valorDETRAN.toFixed(2)}</td>
                <td className="text-center">
                    <ServicoDelete id={servico.id} handleRemove={removeServico} />
                </td>
            </tr>
        ));
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            const response = await axios.delete(`https://localhost:7029/SCGPD/ServicoPrestado/${id}`);
            const data = response.data;
            setServicos(servicos.filter((data) => data.id !== id));
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data === "Servico Prestado possui ordens de serviço cadastradas") {
                setShowAvisoAlert(true);
                setTimeout(() => {
                    setShowAvisoAlert(false);
                }, 5000);
            } else {
                console.log(error);
            }
        }
    };

    // Lógica para renderizar os botões de paginação
    const renderPaginationButtons = () => {
        const totalItems = search(data).length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const pages = [];
        const delta = 1; // Quantidade de botões antes e depois da página atual

        let start = Math.max(1, currentPage - delta);
        let end = Math.min(totalPages, currentPage + delta);

        if (totalPages > 3) {
            if (currentPage <= delta + 1) {
                end = 2 * delta + 1;
            } else if (currentPage >= totalPages - delta) {
                start = totalPages - 2 * delta;
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <li className="list" key={i}>
                    <Button className={`buttonList ${currentPage === i ? 'activePage' : ''}`} onClick={() => handlePagination(i)}>
                        {i}
                    </Button>
                </li>
            );
        }

        return (
            <ul className="pagination-list">
                {currentPage > 1 && (
                    <li className="list">
                        <Button className="buttonList" onClick={() => handlePagination(currentPage - 1)}>
                            <FaAngleLeft />
                        </Button>
                    </li>
                )}
                {pages}
                {currentPage < totalPages && (
                    <li className="list">
                        <Button className="buttonList" onClick={() => handlePagination(currentPage + 1)}>
                            <FaAngleRight />
                        </Button>
                    </li>
                )}
            </ul>
        );
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
                {showAvisoAlert && (
                    <Alert variant="warning" onClose={() => setShowAvisoAlert(false)} dismissible>
                        Não é possível excluir este Serviço, pois está vinculado a uma Ordem de Serviço.
                    </Alert>
                )}

                <Table responsive bordered size="sm" >
                    <thead className="table">
                        <tr>
                            <th className="text-center">Serviço</th>
                            <th className="text-center">Valor Despachante</th>
                            <th className="text-center">Valor DETRAN</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {renderTableRows()}
                    </tbody>

                </Table>


                <div className="paginat">
                    {renderPaginationButtons()}
                </div>

            </section>
        )
    }
}

export default DisplayServicos;