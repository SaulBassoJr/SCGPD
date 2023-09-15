import React from "react";
import '../layout/button-styles.css';
import Button from 'react-bootstrap/Button';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

function ClienteDelete({id, handleRemove}){
  const remove =(e) =>{
    e.preventDefault()

    const confirmed = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (confirmed) {
      handleRemove(id);
    }

  }

  return(
        <div>
          <Button variant="danger"  className="button-styles" onClick={remove}> <FaRegTrashAlt/> </Button>
          <Button variant="primary" className="button-styles" href={`/clientes/novocliente/${id}`} ><FaRegEdit/></Button>
      </div>
    )
}
 export default ClienteDelete