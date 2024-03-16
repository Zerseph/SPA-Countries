import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  SORT_COUNTRIES,
  SEARCH_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_BY_ACTIVITY,
  CREATE_ACTIVITY,
  SET_CURRENT_PAGE,
  SET_SORT_TYPE,
  SET_SORT_ORDER,
  SET_SEATCH_BY_NAME,
  SET_FILTER_CONTINENT,
  SET_ACTIVITIES_FILTER,
  CLEAR_FILTERS
} from "../actions-types/actionsTypes.js";


const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  currentPage: 1,
  sortType: "",
  sortOrder: "asc",
  searchByName: "",
  filterContinent: "",
  activitiesFilter: "",
};

// Define el reducer que gestionará las acciones
//se le pasa por parametro el estado inicial y la action que hara el cambio
function rootReducer(state = initialState, action) {

  //action recibe: Type y el Payload
  //state recibe: estado actual o inicial(si es primera vez)

  // Evalúa el tipo de acción que se ha disparado
  switch (action.type) {

    //CASOS
    case GET_COUNTRIES:
      return {
        // Estado actual con operador spread (...)
        ...state,
        // se actualiza la propiedad countries con los datos recibidos en el payload
        countries: action.payload,
        // También actualiza la propiedad allCountries con los mismos datos
        allCountries: action.payload
      };

    // filtrado por continente
    case FILTER_BY_CONTINENT:
      return {
        ...state,
        countries: AuxfilterByContinent(state.allCountries, action.payload),
      };

    // ordenamiento
    case SORT_COUNTRIES:
      return {
        ...state,
        countries: sortCountriesByType(state.countries, action.payload),
      };

    // búsqueda
    case SEARCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    //Obtiene las actividades para el desplegable
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case FILTER_BY_ACTIVITY:
      return {
        ...state,
        countries: AuxfilterByActivity(state.allCountries, action.payload),
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload], // Agregar la nueva actividad al estado
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };

    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };

    case SET_SEATCH_BY_NAME:
      return {
        ...state,
        searchByName: action.payload,
      };

    case SET_FILTER_CONTINENT:
      return {
        ...state,
        filterContinent: action.payload,
      }

    case SET_ACTIVITIES_FILTER:
      return {
        ...state,
        activitiesFilter: action.payload,
      }

    case CLEAR_FILTERS:
      return {
        ...state,
        sortType: "", // Restablece sortType a su valor por defecto
        sortOrder: "asc",
        searchByName: "",
        filterContinent: "",
        activitiesFilter: "",
        countries: state.allCountries,
      };

    // si no es ningun case retorna el estado sin cambios
    default:
      return state;
  }
}



// ... (funciones auxiliares existentes)

//función para filtrar países por continente
function AuxfilterByContinent(allCountries, continent) {
  if (!continent) {
    return allCountries;
  }

  return allCountries.filter((country) => country.continent === continent);
}

//función para ordenar países por nombre, población o área
function sortCountriesByType(countries, sortInfo) {
  //comprobamos si es falsy o undefine
  if (!sortInfo.type) {
    return countries;
  }

  //se crea una copia superficial del array de países usando slice()
  return countries.slice().sort((a, b) => {
    let comparison = 0;

    if (sortInfo.type === 'name') {
      //se comparison para comparar dos cadenas de caracteres
      comparison = a.name.localeCompare(b.name);
    } else if (sortInfo.type === 'population') {
      comparison = b.population - a.population;
    } else if (sortInfo.type === 'area') {
      comparison = b.area - a.area;
    }

    // Multiplica por -1 si se ordena de forma descendente
    return sortInfo.order === 'desc' ? comparison * -1 : comparison;
  });
}


//función para filtrar países por actividad
function AuxfilterByActivity(countries, activityId) {
  if (!activityId) {
    return countries;
  }

  return countries.filter((country) => {
    // Verificar si el país tiene la propiedad "Activities" y si no está vacía
    if (country.Activities && country.Activities.length > 0) {
      // Utilizar some para verificar si alguna actividad tiene el ID proporcionado
      //si es true se anexa al nuevo array
      return country.Activities.some((activity) => activity.id === activityId);
    }
    // Si el país no tiene actividades o está vacío, devolver false para excluirlo
    return false;
  });
}


// Exporta el reducer para su uso en la configuración de Redux
export default rootReducer;