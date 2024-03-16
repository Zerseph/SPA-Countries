import { setCurrentPage } from "../../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import stylePagination from "./Pagination.module.css";

// eslint-disable-next-line react/prop-types
export default function Pagination({ numberOfCountriesPerPage, totalNumberOfCountries }) {
  // array con los numeros de pagina
  const numberOfPages = [];
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage)

  const pagination = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  /* Calcula la cantidad total de páginas necesarias para mostrar todos los
   países y se pushea en el array pageNumbers
   Math.ceil(...) redondea hacia arriba para asegurarse de que incluso si 
   hay fracciones de páginas, se necesitará una página adicional.
   32/10 = 3,2*/
  for (let i = 1; i <= Math.ceil(totalNumberOfCountries / numberOfCountriesPerPage); i++) {
    numberOfPages.push(i); //ejemplo [1, 2, 3, 4]
  }

  // Render
  return (
    <nav className={stylePagination.contpag}>

      <button
        className={stylePagination.navButtonLeft}
        onClick={() => pagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>


      <ul>
        {/* Mapear sobre los numeros de pagina y renderizar un boton para cada uno */}
        {numberOfPages.map((pageNumber) => (
          <button
            className={`${stylePagination.botpag} ${pageNumber === currentPage ? stylePagination.currentPage : ''}`}
            key={pageNumber}
            onClick={() => pagination(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </ul>

      <button
        className={stylePagination.navButtonRight}
        onClick={() => pagination(currentPage + 1)}
        disabled={currentPage === numberOfPages.length}
      >
        {'>'}
      </button>
    </nav>
  );
}
