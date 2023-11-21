import React from "react";
import '../layout/button-styles.css';
import Button from 'react-bootstrap/Button';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import jsPDF from 'jspdf';
import { VscFilePdf } from "react-icons/vsc";
import { useState } from "react";

function OsDelete({ id, handleRemove }) {
  const[printData, setPrintData] = useState(null);
  const remove = (e) => {
    e.preventDefault()

    const confirmed = window.confirm("Tem certeza que deseja excluir este veiculo?");
    if (confirmed) {
      handleRemove(id);
    }

  }



  return (
    <div>
      <Button variant="danger" className="button-styles" onClick={remove}> <FaRegTrashAlt /> </Button>
      <Button variant="primary" className="button-styles" href={`/os/novaOs/${id}`} ><FaRegEdit /></Button>
    </div>
  )
}
export default OsDelete