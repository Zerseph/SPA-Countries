import { filterByContinent, setCurrentPage, setFilterContinent } from '../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ContinentFilter.module.css';

// eslint-disable-next-line react/prop-types
export default function ContinentFilter() {
    const dispatch = useDispatch();
    const filterContinent = useSelector((state) => state.filterContinent);

    const handleFilterByContinent = (filterType) => {
        dispatch(setFilterContinent(filterType));
        dispatch(filterByContinent(filterType));
        dispatch(setCurrentPage(1))
    }

    return (
        <div>
            <label htmlFor="filterContinent">Filter by Continent</label>
            <select value={filterContinent} id="filterContinent" className={styles.selectContinent}
                onChange={(event) => handleFilterByContinent(event.target.value)}>
                <option value="">All</option>
                {/* Mapea los continentes disponibles para armar las options */}
                {['Africa', 'South America', 'Asia', 'Europe', 'Oceania'].map((continent) => (
                    <option key={continent} value={continent}>
                        {continent}
                    </option>
                ))}
            </select>
        </div>
    );
}
