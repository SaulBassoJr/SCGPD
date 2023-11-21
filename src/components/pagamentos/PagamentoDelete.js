import React from "react";
import '../layout/button-styles.css';
import { Modal, Button } from 'react-bootstrap';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import {useState} from "react";

function PagamentoDelete({ id, handleRemove }) {
  const [printData, setPrintData] = useState(null);
  const remove = (e) => {
    e.preventDefault()

    const confirmed = window.confirm("Tem certeza que deseja excluir este pagamento?");
    if (confirmed) {
      handleRemove(id);
    }

  }

  return (
    <section>
      <div>
        <Button variant="danger" className="button-styles" onClick={remove}> <FaRegTrashAlt /> </Button>
        <Button variant="primary" className="button-styles" href={`/pagamentos/novopagamento/${id}`} ><FaRegEdit /></Button>
      </div>
  
    </section>
  )
}
export default PagamentoDelete