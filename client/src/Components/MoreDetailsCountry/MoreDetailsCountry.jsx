import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MoreDetailsCountry.module.css'; // Importa los estilos CSS

const MoreDetailsCountry = () => {
    // Obtiene el parámetro
    const { id } = useParams();

    // Estado para almacenar los detalles del país
    const [countryDetails, setCountryDetails] = useState(null);

    //cargar los detalles del país
    useEffect(() => {
        // obtener detalles del país por ID
        const fetchCountryDetails = async () => {
            try {
                const response = await axios.get(`/countries/${id}`);
                // Actualiza el estado con los detalles del pais recibidos
                setCountryDetails(response.data);
            } catch (error) {
                // Manejo de errores
                console.error(`Error fetching country details: ${error.message}`);
            }
        };
        // Ejecutamos para obtener los detalles del pais cuando el componente se monta
        fetchCountryDetails();
    }, [id]);


    return (
        <div className={styles.detailsContainer}>
            {countryDetails ? (
                <>
                    {/* Parte izquierda del contenedor (bandera y propiedades del país) */}
                    <div className={styles.detailsLeft}>
                        <img src={countryDetails.imgFlag} alt={`Flag of ${countryDetails.name}`} />
                        <h2>{countryDetails.name}</h2>
                        {/* Propiedades del país */}
                        <p><b>ID:</b> {countryDetails.id}</p>
                        <p><b>Continent:</b> {countryDetails.continent}</p>
                        <p><b>Capital: </b>{countryDetails.capital}</p>
                        {countryDetails.subregion && <p><b>Subregion:</b> {countryDetails.subregion}</p>}
                        {countryDetails.area && <p><b>Area:</b> {countryDetails.area} square kilometers</p>}
                        <p><b>Population:</b> {countryDetails.population}</p>
                        {/* Enlace para volver a la página principal */}
                        <Link to="/home">
                            <button className={styles.backButton}>Back to Home</button>
                        </Link>
                    </div>

                    {/* Parte derecha del contenedor (actividades del país) */}
                    <div className={styles.activitiesContainer}>
                        {/* Renderiza las actividades si existen */}
                        {countryDetails.Activities && countryDetails.Activities.length > 0 && (
                            <>
                                <h3>Activities:</h3>
                                {/* Lista de actividades */}
                                <ul className={styles.activitiesList}>
                                    {/* Mapea cada actividad y la muestra en la lista */}
                                    {countryDetails.Activities.map((activity) => (
                                        <li key={activity.id} className={styles.activityItem}>
                                            {/* Nombre de la actividad */}
                                            <span className={styles.activityName}>{activity.name}</span>
                                            <div className={styles.activityInfo}>
                                                {/* Información detallada de la actividad */}
                                                <p><b>Season:</b> {activity.season}</p>
                                                <p><b>Difficulty:</b> {activity.difficulty}</p>
                                                <p><b>Duration:</b> {activity.duration} hours</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </>
            ) : (
                // Muestra un mensaje mientras se cargan los detalles del país
                <p>Loading country details...</p>
            )}
        </div>
    );
};

export default MoreDetailsCountry;
