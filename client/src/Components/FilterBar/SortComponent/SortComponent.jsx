import { sortCountries, setCurrentPage, setSortType, setSortOrder } from '../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SortComponent.module.css';  // Asegúrate de importar los estilos correctamente

// eslint-disable-next-line react/prop-types
export default function SortComponent() {
    const dispatch = useDispatch();
    const sortType = useSelector((state) => state.sortType);
    const sortOrder = useSelector((state) => state.sortOrder)

    //ordenamiento
    const handleSort = (sortType) => {
        dispatch(setSortType(sortType));// Se actualiza el estado con el nuevo tipo de ordenamiento
        //se despacha el nuevo objeto ej  { type: 'population', order: 'asc' };
        dispatch(sortCountries({ type: sortType, order: sortOrder }));
        dispatch(setCurrentPage(1));
    };

    const toggleSortOrder = () => {
        //si es asc cambia a desc si no es asi cambia a asc
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(newOrder));
        if (sortType) {
            dispatch(sortCountries({ type: sortType, order: newOrder }));
        }
    };


    return (
        <div>
            <label htmlFor="sortType">Sort them by</label>
            <select id="sortType" value={sortType} onChange={(event) => handleSort(event.target.value)}>
                <option value="">Any Order</option>
                <option value="name">Name</option>
                <option value="population">Population</option>
                <option value="area">Area</option>
            </select>
            <button
                onClick={toggleSortOrder}
                className={sortOrder === 'asc' ? styles.ascButton : styles.descButton}
                value={sortOrder}
            >
                {`Toggle Order (${sortOrder === 'asc' ? 'Ascending' : 'Descending'})`}
            </button>
        </div>
    );
}
