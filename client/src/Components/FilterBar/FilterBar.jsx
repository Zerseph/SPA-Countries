import ActivityFilter from './ActivityFilter/ActivityFilter.jsx';
import CreateActivityButton from './CreateActivityButton/CreateActivityButton.jsx';
import ContinentFilter from './ContinentFilter/ContinentFilter.jsx';
import SortComponent from './SortComponent/SortComponent.jsx';
import InputSearchCountries from './InputSearchCountries/InputSearchCountries.jsx'
import { useDispatch } from 'react-redux';
import { clearFilters } from '../../Redux/actions/actions.js';
import style from './FilterBar.module.css';

// eslint-disable-next-line react/prop-types
export default function FilterBar() {
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(clearFilters());

  }


  return (
    <div className={style.filterBar}>

      {/* Formulario de Crear Actividad*/}
      <CreateActivityButton />

      <button onClick={handleClearFilters} className={style.botClearFilters}>Clear Filters</button>

      {/* Filtrado por actividad */}
      <ActivityFilter />

      {/* Filtrado por continente */}
      <ContinentFilter />

      {/* Ordenamiento por Area, Population y Name + Alternar Orden */}
      <SortComponent />

      {/* Boton de Búsqueda de Paises*/}
      <InputSearchCountries />

    </div>
  );
}
