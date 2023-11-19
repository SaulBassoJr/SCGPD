import Button from 'react-bootstrap/Button';
import ClienteDelete from './ClienteDelete'
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

function DisplayClientes() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clientes, setClientes] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["nome", "cpf"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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

    // Lógica para paginar os dados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(data).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(search(data).length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderTableRows = () => {
        return currentItems.map((cliente) => (
            <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td className="text-end">{cliente.cpf}</td>
                <td className="text-end">{cliente.telefone}</td>
                <td >{cliente.endereco}</td>
                <td className="text-end">{cliente.numero}</td>
                <td>{cliente.bairro}</td>
                <td className="text-end">{cliente.cep}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.uf}</td>
                <td className="text-center">
                    <ClienteDelete id={cliente.id} handleRemove={removeCliente} />
                </td>
            </tr>
        ));
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


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
                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Cliente excluído com sucesso!
                    </Alert>
                )}

                <Table responsive bordered size="sm" >
                    <thead className="table">
                        <tr>
                            <th className="text-center">Nome</th>
                            <th className="text-center">CPF</th>
                            <th className="text-center">N°Celular</th>
                            <th className="text-center">Endereço</th>
                            <th className="text-center">Numero</th>
                            <th className="text-center">Bairro</th>
                            <th className="text-center">CEP</th>
                            <th className="text-center">Cidade</th>
                            <th className="text-center">UF</th>
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

export default DisplayClientes;