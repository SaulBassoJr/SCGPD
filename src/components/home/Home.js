import './homeContainer.css';
import savings from '../../img/Logo500P500.png'

function Home(){
    return(
        <div className="homeContainer">
            <h1>Sistema de cadastro e gerenciamento <span>SCGPD</span></h1>
            <img src={savings} alt="front_scgpd"/>
        </div>
    );
}

export default Home;