import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries} from "../../Redux/actions/actions.js";
import Card from './Card/Card.jsx';
import Pagination from "./Pagination/Pagination.jsx";
import FilterBar from "../FilterBar/FilterBar.jsx";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const currentPage = useSelector((state) => state.currentPage)
  const numberOfCountriesPerPage = 10;

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const indexOfLastCountry = currentPage * numberOfCountriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - numberOfCountriesPerPage;
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);


  return (
    <div className={style.container}>

      {/* FilterBar */}
      <FilterBar/>

      {/* Componente card */}
      <div className={style.contenedorCards}>
        {currentCountries.length ? (
          currentCountries.map(({ name, index, imgFlag, id, continent }) => {
            return (
              <div key={id} className={style.Card}>
                <Card
                  imgFlag={imgFlag}
                  name={name}
                  continent={continent}
                  key={index}
                  id={id} />
              </div>
            );
          })
        ) : (
          <h1>Loading countries...</h1>
        )}
      </div>

      {/* Pagination */}
      <div className={style.pagination}>
        <Pagination
          numberOfCountriesPerPage={numberOfCountriesPerPage}
          totalNumberOfCountries={allCountries.length}
        />
      </div>
    </div>
  );
}