import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';


import './imprimeContainer.css'

function ImprimeOs({ os }) {

    const printRef = useRef();

    // Verifica se os existe e se a propriedade cliente está definida antes de acessá-la
    if (!os || !os.cliente) {
        return <div>Dados não disponíveis</div>;
    }

    // Agora você pode acessar com segurança a propriedade cliente
    const { cliente } = os;

    function boolToSimNao(value) {
        return value ? 'Sim' : 'Não';
    };

    return (
        <section className='imprimeContainer' >
            <div ref={printRef}>
                <div className="divImprime">
                    <h1> ORDEM DE SERVIÇO</h1>
                    <h1>
                        DESPACHANTE MAINARDES
                    </h1>
                    <h2>PORTARIA 878/21 – MATRICULA 456017-5
                        RUA PAULO ABRÃO, 270-CENTRO
                    </h2>
                    <h2>
                        FONE 98871-0639/ despachantemainardes@gmail.com
                    </h2>
                    <div className="containerTable">
                        <p className="lineP"><span className="spanSt">NOME:</span> {os.cliente ? os.cliente.nome : ''}</p>
                        <div className="divPar">
                            <p className="lineP"><span className="spanSt">CPF:</span> {os.cliente ? os.cliente.cpf : ''}</p>
                            <p className="lineP"><span className="spanSt">DATA VENDA:</span> {os.dataVenda !== undefined ? new Date(os.dataVenda).toLocaleDateString('pt-BR') : ''}</p>
                        </div>
                        <div className="divPar">
                            <p className="lineP"><span className="spanSt">TEL:</span> {os.cliente ? os.cliente.telefone : ''}</p>
                            <p className="lineP"><span className="spanSt">VENCE:</span> {os.dataVencimento !== undefined ? new Date(os.dataVencimento).toLocaleDateString('pt-BR') : ''}</p>
                        </div>
                        <div className="divPar">
                            <p className="lineP"><span className="spanSt">PLACA:</span> {os.veiculo ? os.veiculo.placa : ''}</p>
                            <p className="lineP"> ( {os.conversaoMercosul ? 'X' : ' '} )<span className="spanSt">CONVERSÃO MERCOSUL</span></p>
                        </div>
                        <div className="divPar" >
                            <p className="lineP"><span className="spanSt">MODELO:</span> {os.veiculo ? os.veiculo.modelo : ''}</p>
                            <p className="lineP">( {os.veiculo.financiamento ? 'X' : ' '} )<span className="spanSt">INCLUSÃO</span>  ( {os.veiculo.financiamento ? ' ' : 'X'} )<span className="spanSt">EXCLUSÃO</span></p>
                        </div>
                        <p className="lineP"><span className="spanSt">VALOR VEICULO:</span> R${os.valorVeiculo.toFixed(2)}</p>
                        <p className="lineP"><span className="spanSt">DÉBITOS:</span> {boolToSimNao(os.veiculo.debitos)}</p>
                        <p className="lineP"><span className="spanSt">OBS:</span> {os.observacoes}</p>
                        <p className="lineP"><span className="spanSt">SERVIÇO:</span>{os.servicoPrestado ? os.servicoPrestado.nome : ''}</p>
                        <p className="lineP"><span className="spanSt">TOTAL</span> R${os.servicoPrestado ? (os.servicoPrestado.valorDespachante + os.servicoPrestado.valorDETRAN).toFixed(2) : ''}</p>
                        <p className="lineP"><span className="mrgP">PIRAÍ DO SUL</span>  {os.dataCriacao !== undefined ? new Date(os.dataCriacao).toLocaleDateString('pt-BR') : ''}</p>
                    </div>
                    <h2 className="marg">DOCUMENTOS DEVEM SER RETIRADOS PORTANDO ESSA ORDEM DE SERVIÇO.</h2>
                    <div className="divParAss">
                        <p>-------------------------------------</p> <p>-------------------------------------</p>
                    </div>
                    <div className="divParAss2">
                        <p>DESPACHANTE JULIANE</p> <p>CLIENTE</p>
                    </div>
                </div>

                <div className="divImprime">
                    <h1> ORDEM DE SERVIÇO</h1>
                    <h1>
                        DESPACHANTE MAINARDES
                    </h1>
                    <h2>PORTARIA 878/21 – MATRICULA 456017-5
                        RUA PAULO ABRÃO, 270-CENTRO
                    </h2>
                    <h2>
                        FONE 98871-0639/ despachantemainardes@gmail.com
                    </h2>
                    <div className="containerTable">
                        <p className="lineP"><span className="spanSt">NOME:</span> {os.cliente ? os.cliente.nome : ''}</p>
                        <div className="divPar">
                            <p className="lineP"><span className="spanSt">CPF:</span> {os.cliente ? os.cliente.cpf : ''}</p>
                            <p className="lineP"><span className="spanSt">DATA VENDA:</span> {os.dataVenda !== undefined ? new Date(os.dataVenda).toLocaleDateString('pt-BR') : ''}</p>
                        </div>
                        <div className="divPar">
                            <p className="lineP"><span className="spanSt">TEL:</span> {os.cliente ? os.cliente.telefone : ''}</p>
                            <p className="lineP"><span className="spanSt">VENCE:</span> {os.dataVencimento !== undefined ? new Date(os.dataVencimento).toLocaleDateString('pt-BR') : ''}</p>
                        </div>
                        <div className="divPar">
                            <p className="lineP"><span className="spanSt">PLACA:</span> {os.veiculo ? os.veiculo.placa : ''}</p>
                            <p className="lineP"> ( {os.conversaoMercosul ? 'X' : ' '} )<span className="spanSt">CONVERSÃO MERCOSUL</span></p>
                        </div>
                        <div className="divPar" >
                            <p className="lineP"><span className="spanSt">MODELO:</span> {os.veiculo ? os.veiculo.modelo : ''}</p>
                            <p className="lineP">( {os.veiculo.financiamento ? 'X' : ' '} )<span className="spanSt">INCLUSÃO</span>  ( {os.veiculo.financiamento ? ' ' : 'X'} )<span className="spanSt">EXCLUSÃO</span></p>
                        </div>
                        <p className="lineP"><span className="spanSt">VALOR VEICULO:</span> R${os.valorVeiculo.toFixed(2)}</p>
                        <p className="lineP"><span className="spanSt">DÉBITOS:</span> {boolToSimNao(os.veiculo.debitos)}</p>
                        <p className="lineP"><span className="spanSt">OBS:</span> {os.observacoes}</p>
                        <p className="lineP"><span className="spanSt">SERVIÇO:</span>{os.servicoPrestado ? os.servicoPrestado.nome : ''}</p>
                        <p className="lineP"><span className="spanSt">TOTAL</span> R${os.servicoPrestado ? (os.servicoPrestado.valorDespachante + os.servicoPrestado.valorDETRAN).toFixed(2) : ''}</p>
                        <p className="lineP"><span className="mrgP">PIRAÍ DO SUL</span>  {os.dataCriacao !== undefined ? new Date(os.dataCriacao).toLocaleDateString('pt-BR') : ''}</p>
                    </div>
                    <h2 className="marg">DOCUMENTOS DEVEM SER RETIRADOS PORTANDO ESSA ORDEM DE SERVIÇO.</h2>
                    <div className="divParAss">
                        <p>-------------------------------------</p> <p>-------------------------------------</p>
                    </div>
                    <div className="divParAss2">
                        <p>DESPACHANTE JULIANE</p> <p>CLIENTE</p>
                    </div>
                </div>
            </div>
            <ReactToPrint
                trigger={() => <button className="imprimirButton">Imprimir</button>}
                content={() => printRef.current}
            />
        </section>
    );
}

export default ImprimeOs;