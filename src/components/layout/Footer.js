import { GrGithub} from 'react-icons/gr';
import './footerModule.css';


function Footer(){
    return(
        <footer className="footer">
            <ul className="social_list">
                <li>
                    <a href='https://github.com/SaulBassoJr' target="_blank" rel="noreferrer"><GrGithub/><p> DevSaul</p></a>
                </li>
                <li>
                   <a href='https://github.com/ViniciusMatheusGoy' target='_blank' rel="noreferrer"><GrGithub/> <p> DevVinicius</p></a>
                </li>
            </ul>
            <p className="copy_right">
                <span>SCGPD</span> &copy;2023
            </p>
        </footer>
    )

}

export default Footer