import OsDelete from './OsDelete'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { Modal, Button } from 'react-bootstrap';
import ImprimeOs from './ImprimeOs'; // Seu componente ImprimeOs


import '../layout/button-styles.css';
import '../layout/buscador-styles.css'
import '../layout/sectionLayout.css';
import '../layout/table.css';

function DisplayOs() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [oss, setOss] = useState([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [printData, setPrintData] = useState(null);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["cliente.nome", "veiculo.placa", "servicoPrestado.nome"]);
    const [filterParam, setFilterParam] = useState(["All"]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const getOss = async () => {
        try {
            const response = await axios.get('https://localhost:7029/SCGPD/OrdemDeServico');
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

    // Lógica para paginar os dados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = search(data).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(search(data).length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderTableRows = () => {
        return currentItems.map((os) => (
            <tr key={os.id}>
                <td>{os.cliente ? os.cliente.nome : ''}</td>
                <td className="text-end">
                    {os.cliente ? os.cliente.cpf : ''}
                </td>
                <td className="text-end">
                    {os.cliente ? os.cliente.telefone : ''}
                </td>
                <td className="text-end">
                    {os.veiculo ? os.veiculo.placa : ''}
                </td>
                <td>
                    {os.veiculo ? os.veiculo.modelo : ''}
                </td>
                <td>
                    {os.servicoPrestado ? os.servicoPrestado.nome : ''}
                </td>
                <td className="text-end">
                    R${os.servicoPrestado ? (os.servicoPrestado.valorDespachante + os.servicoPrestado.valorDETRAN).toFixed(2) : ''}
                </td>
                <td className="text-center">
                    {os.dataCriacao !== undefined ? new Date(os.dataCriacao).toLocaleDateString('pt-BR') : ''}
                </td>
                <td className="text-end">
                    {os.prazo !== undefined ? os.prazo : ''}
                </td>

                <td className="text-center">
                    <OsDelete
                        id={os.id}
                        handleRemove={removeOs}
                    />
                </td>
                <td className="text-center">
                    <Button className="pdfButton" onClick={() => handleOpenModal(os)}>Visualizar OS</Button>
                </td>
            </tr>
        ));
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    function search(oss) {
        return oss.filter((os) => {
            if (filterParam == 'All') {
                return searchParam.some((newOs) => {
                    const fields = newOs.split('.'); // Divide o campo em partes para navegá-lo
                    let fieldValue = os;

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
                return os[filterParam]
                    ?.toString()
                    .toLowerCase()
                    .includes(q.toLowerCase());
            }
        });
    }


    const removeOs = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7029/SCGPD/OrdemDeServico/${id}`);
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

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (selectedOs) => {
        setPrintData(selectedOs);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                    <thead className="table">
                        <tr>
                            <th className="text-center">Proprietario</th>
                            <th className="text-center">CPF</th>
                            <th className="text-center">N° Celular</th>
                            <th className="text-center">Placa</th>
                            <th className="text-center">Modelo</th>
                            <th className="text-center">Serviço Prestado</th>
                            <th className="text-center">Valor Serviço</th>
                            <th className="text-center">Data</th>
                            <th className="text-center">Prazo</th>
                            <th> </th>
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
                <div>
                    <Modal show={showModal} onHide={handleCloseModal} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Visualizar Ordem de Serviço</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ImprimeOs os={printData} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleCloseModal}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </section>
        )
    }
}

export default DisplayOs;