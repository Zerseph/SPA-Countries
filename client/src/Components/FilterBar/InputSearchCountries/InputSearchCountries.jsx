import { useDispatch, useSelector } from 'react-redux';
import { searchCountries, setCurrentPage, setSearchByName } from '../../../Redux/actions/actions';
import style from './InputSearchCountries.module.css';  // Asegúrate de tener el nombre correcto del archivo de estilos

// eslint-disable-next-line react/prop-types
export default function InputSearchCountries() {
    const dispatch = useDispatch();
    const SearchByName = useSelector((state) => state.searchByName)

    const handleSearch = (searchTerm) => {
        dispatch(setSearchByName(searchTerm));
        dispatch(searchCountries(searchTerm));
        dispatch(setCurrentPage(1));
    };

    return (
        <input
            type="text"
            id="searchInput"
            placeholder="Search by name"
            value={SearchByName}
            onChange={(event) => handleSearch(event.target.value)}
            className={style.searchInput}  // Asegúrate de tener la clase de estilo correcta
        />
    );
}