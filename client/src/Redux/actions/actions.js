import axios from "axios";

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



export function getCountries() {
  return async function (dispatch) {
    try {
      let response = await axios.get("/countries/");
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data
      })
    } catch (error) {
      console.error(`error fetching countries ${error.messaje}`)
    }
  }
}


export function filterByContinent(filterType) {
  return {
    type: FILTER_BY_CONTINENT,
    payload: filterType,
  };
}

// Acción para ordenar países por nombre, población o área
export function sortCountries(sortInfo) {
  return {
    type: SORT_COUNTRIES,
    payload: sortInfo,
  };
}

export function setSortType(sortType) {
  return {
    type: SET_SORT_TYPE,
    payload: sortType,
  }
}

export function setSortOrder(newOrder) {
  return {
    type: SET_SORT_ORDER,
    payload: newOrder,
  }
}

export function setSearchByName(searchTerm) {
  return {
    type: SET_SEATCH_BY_NAME,
    payload: searchTerm,
  }
}

export function setFilterContinent(filterType) {
  return {
    type: SET_FILTER_CONTINENT,
    payload: filterType,
  }
}

export function setActivitiesFilter(activityId) {
  return {
    type: SET_ACTIVITIES_FILTER,
    payload: activityId,
  }
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  }
}

// Acción para buscar países por nombre
export function searchCountries(searchTerm) {
  return async function (dispatch) {
    try {
      let response;

      if (searchTerm === "") {
        response = await axios.get("/countries/");
      } else {
        response = await axios.get(`/countries/name/?name=${searchTerm}`);
      }
      dispatch({
        type: SEARCH_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error searching countries: ${error.message}`);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      let response = await axios.get("/activities/");
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
}

export function filterByActivity(activityId) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activityId,
  };
}

export function createActivity(activityData) {
  return async function (dispatch) {
    try {
      let response = await axios.post('/activities', activityData);
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error creating activity:', error);

      throw new Error(`${error.message}`);
    }
  };
}

export function setCurrentPage(pageNumber) {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber
  };
}