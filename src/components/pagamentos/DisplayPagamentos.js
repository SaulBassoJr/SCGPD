import Button from 'react-bootstrap/Button';
import PagamentoDelete from './PagamentoDelete';
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

function DisplayPagamentos() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pagamentos, setPagamentos] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showAvisoAlert, setShowAvisoAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["formaDePagamento"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const getPagamentos = async () => {
        try {
            const response = await axios.get('https://localhost:7029/SCGPD/Pagamento');
            const data = response.data;
            setPagamentos(data);
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPagamentos();
    }, []);

    const data = Object.values(pagamentos);

    // Lógica para paginar os dados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(data).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(search(data).length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderTableRows = () => {
        return currentItems.map((pagamento) => (
            <tr key={pagamento.id}>
                <td>{pagamento.formaDePagamento}</td>
                <td className="text-end">R${pagamento.valor.toFixed(2)}</td>
                <td className="text-center" >{boolToSimNao(pagamento.status)}</td>
                <td className="text-center">
                    <PagamentoDelete id={pagamento.id} handleRemove={removePagamento} />
                </td>
            </tr>
        ));
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    function search(pagamentos) {
        return pagamentos.filter((pagamento) => {
            if (filterParam == 'All') {
                return searchParam.some((newPagamento) => {
                    const fields = newPagamento.split('.'); // Divide o campo em partes para navegá-lo
                    let fieldValue = pagamento;

                    // Navega pelos campos aninhados, se houver
                    for (let field of fields) {
                        fieldValue = fieldValue[field];
                        if (!fieldValue) break;
                    }

                    if (fieldValue) {
                        const fieldValueString = fieldValue.toString().toLowerCase();
                        return fieldValueString.includes(q.toLowerCase());
                    }
                    return false;
                });
            } else {
                return pagamento[filterParam]
                    ?.toString()
                    .toLowerCase()
                    .includes(q.toLowerCase());
            }
        });
    }

    const removePagamento = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7029/SCGPD/Pagamento/${id}`);
            const data = response.data;
            setPagamentos(pagamentos.filter((data) => data.id !== id));
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data === "Pagamento possui Ordem de Serviço cadastrada") {
                setShowAvisoAlert(true);
                setTimeout(() => {
                    setShowAvisoAlert(false);
                }, 5000);
            } else {
                console.log(error);
            }
        }
    };

    function boolToSimNao(value) {
        return value ? 'Pago' : 'Não pago';
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
                <h1> Registro de Pagamentos</h1>
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
                        Não é possível excluir este Pagamento, pois está vinculado a uma Ordem de Serviço.
                    </Alert>
                )}

                <Table responsive bordered size="sm" >
                    <thead className="table">
                        <tr>
                            <th className="text-center">Forma de Pagamento</th>
                            <th className="text-center">Valor</th>
                            <th className="text-center">Status</th>
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

export default DisplayPagamentos;