import React from "react";
import '../layout/button-styles.css';
import Button from 'react-bootstrap/Button';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

function PagamentoDelete({id, handleRemove}){
  const remove =(e) =>{
    e.preventDefault()

    const confirmed = window.confirm("Tem certeza que deseja excluir este pagamento?");
    if (confirmed) {
      handleRemove(id);
    }

  }

  return(
        <div>
          <Button variant="danger"  className="button-styles" onClick={remove}> <FaRegTrashAlt/> </Button>
          <Button variant="primary" className="button-styles" href={`/servicos/novoservico/${id}`} ><FaRegEdit/></Button>
      </div>
    )
}
 export default PagamentoDelete