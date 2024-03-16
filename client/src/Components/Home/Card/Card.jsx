import { Link } from "react-router-dom";

import styleCard from "./Card.module.css"

// eslint-disable-next-line react/prop-types
export default function Card({imgFlag, name, continent, population ,id}) {
    return (
        <div className={styleCard.card}>
            <div><img className={styleCard.bandera} src={imgFlag} alt="Imagen no disponible" /></div>
            <h3 className={styleCard.titulo}>{name}</h3>
            <h5 className={styleCard.continente}>{continent}</h5>
            <h5 className={styleCard.capital}>{population}</h5>
            
            
            <Link to={`/countries/${id}`}><button className={styleCard.boton}>More Details</button></Link>
                        
        </div>
    );
}