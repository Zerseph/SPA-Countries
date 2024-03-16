import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getCountries } from '../../Redux/actions/actions.js';
import validateActivityForm from './ActivityFormValidate';
import activityStyles from './ActivityForm.module.css';
import { Link } from 'react-router-dom';

export default function ActivityForm() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  //estado para seleccionar paises
  const [arraySelectedCountries, setArraySelectedCountries] = useState([]);

  //estado para success
  const [successMessage, setSuccessMessage] = useState('');

  // estado de errores
  const [errorMessage, setErrorMessage] = useState('');

  //estado de errores de validacion
  const [validationErrors, setValidationErrors] = useState({});

  //estado para señalar el error
  const [highlightedFields, setHighlightedFields] = useState([]);


  // Estado para almacenar los datos de la actividad
  const [activityData, setActivityData] = useState({
    name: '',
    difficulty: '',
    duration: 0,
    season: '',
    countries: [],
  });


  useEffect(() => {
    // Se ejecuta al montar el componente para obtener la lista de países
    dispatch(getCountries());
  }, [dispatch]);


//funcion Auxiliar para ordenar paises del select
  function HandleSortCountries(allCountries) {
    //se crea una copia superficial del array de países usando slice()
    return allCountries.slice().sort((countryA, countryB) => {
      let comparison = 0;
      //se comparison para comparar dos cadenas de caracteres
      comparison = countryA.name.localeCompare(countryB.name);
      return comparison;
    });
  }
  const AllCountriesOrderDone = HandleSortCountries(allCountries);


  // Maneja la eliminación de un país de los seleccionados
  const handleCountryClick = (countryId) => {
    setArraySelectedCountries((prevSelectedCountries) =>
      prevSelectedCountries.filter((id) => id !== countryId)
    );
    // se setea el estado activityData después de quitar el país
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      countries: prevActivityData.countries.filter((id) => id !== countryId),
    }));
  };


  // Maneja los cambios en los campos de entrada y va seteando el value del campo
  const handleInputChange = (event) => {
    console.log('Input Change:', event.target.name, event.target.value);
    setErrorMessage('');
    setSuccessMessage('')
    const { name, value } = event.target;

    // Realiza las validaciones del formulario
    const error = validateActivityForm({
      ...activityData,
      [name]: value
    }, name);

    // Actualiza el estado de validación para el campo actual
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setActivityData({
      ...activityData,
      [name]: value,
    });
  };


  // Maneja los cambios en la selección de países haciendo dos sets
  const handleCountryChange = (event) => {

    setErrorMessage('');
    setSuccessMessage('')

    const selectedCountryId = event.target.value;


    if (selectedCountryId && !arraySelectedCountries.includes(selectedCountryId)) {

      //se setea el array de countries seleccionadas
      setArraySelectedCountries((prevSelectedCountries) => [
        ...prevSelectedCountries,
        selectedCountryId,
      ]);

      // se setea la propiedad countries del estado activityData con los países seleccionados
      setActivityData((prevActivityData) => ({
        ...prevActivityData,
        countries: [...prevActivityData.countries, selectedCountryId],
      }));

      // Realiza las validaciones en tiempo real
      console.log("Antes de mandarlo a validateActvityForm", selectedCountryId)
      const error = validateActivityForm(
        {
          ...activityData,
          countries: [...activityData.countries, selectedCountryId],
        },
        'countries'
      );
      console.log("Este es erroooooooooooor", error)

      // Actualiza el estado de validación para el campo actual
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        countries: error,
      }));

    }
  };

  //verificamos si validationErrors tiene errores
  const hasValidationErrors = () => {
    const errorValues = Object.values(validationErrors);
    return errorValues.some((error) => error !== '');
  };


  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    console.log('Form Submitted');

    // Se detiene la acción del evento para manipularla
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('')

    // Realiza las validaciones del formulario
    const currentValidationErrors = {};
    Object.keys(activityData).forEach((fieldName) => {

      const error = validateActivityForm(activityData, fieldName);

      if (error) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: error,
        }));

        currentValidationErrors[fieldName] = error;
      }
    });

    // Verifica si hay errores de validación y si todos los campos obligatorios están llenos
    const hasErrors = Object.keys(currentValidationErrors).length > 0;
    const allFieldsFilled = Object.entries(activityData).every(([key, value]) => {
      if (key === 'countries') {
        return Array.isArray(value) && value.length > 0;
      } else {
        return value !== '';
      }
    });

    // Si no hay errores y todos los campos están llenos, intenta crear la actividad
    if (!hasErrors && allFieldsFilled) {
      try {
        await dispatch(createActivity({ ...activityData, countries: arraySelectedCountries }));
        await dispatch(getCountries());

        // Actualiza los mensajes de éxito y error
        setSuccessMessage('Activity created successfully');
        setErrorMessage('');
      } catch (error) {
        // Actualiza los mensajes de éxito y error en caso de fallo
        setSuccessMessage('');
        setErrorMessage(`Error creating activity, reason: ${error.message}`);
      }
    } else {
      // Actualiza el mensaje de error en caso de validación fallida o campos no llenos
      setSuccessMessage('');
      if (!allFieldsFilled) {

        setErrorMessage('Please fill in all fields.');

        // Resalta los campos vacios temporalmente
        setHighlightedFields(Object.keys(activityData).filter((field) => {
          const value = activityData[field];

          // Agrega la condicion para verificar si es un array vacio
          if (Array.isArray(value)) {
            return value.length === 0;
          }
          // Verifica si el campo esta vacio o es falsy
          return !value;
        }));

        setTimeout(() => setHighlightedFields([]), 1000); // Remueve el resaltado después de 1 segundo

      } else {
        setErrorMessage('Please complete all fields correctly.');
      }
    }
  };

  return (
    <div className={activityStyles.activityContainer}>

      {window.location.pathname === '/create-activity' && (
        <Link to="/home">
          <button className={activityStyles.backToHomeButton}>Back to Home</button>
        </Link>
      )}

      <form onSubmit={handleSubmit} className={activityStyles.activityForm}>


        {/* TITULO */}
        <div className={activityStyles.activityFormTitle}>CREATE ACTIVITY</div>

        {/* ------------------------------------------------------------ */}


        <label
          htmlFor="name"
          className={activityStyles.labelName}>
          Name Activity:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={activityData.name}
          onChange={handleInputChange}
          autoComplete="off"
          className={`${activityStyles.inputName} ${highlightedFields.includes('name') ? activityStyles.highlightedField : ''
            }`} />
        {validationErrors.name && <p className={activityStyles.errorMessage}>{validationErrors.name}</p>}
        {/* ------------------------------------------------------------ */}


        {/* SELECCIONA LA DIFICULTAD*/}
        <label htmlFor="difficulty" className={activityStyles.labelDifficulty}>
          Difficulty:
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={activityData.difficulty}
          onChange={handleInputChange}
          className={`${activityStyles.selectDifficulty} ${highlightedFields.includes('difficulty') ? activityStyles.highlightedField : ''
            }`}>
          <option value="">Select difficulty</option>
          <option value="1">1 - Easy</option>
          <option value="2">2 - Intermediate</option>
          <option value="3">3 - Medium</option>
          <option value="4">4 - Challenging</option>
          <option value="5">5 - Expert</option>
        </select>
        {validationErrors.difficulty && <p className={activityStyles.errorMessage}>{validationErrors.difficulty}</p>}


        {/* ------------------------------------------------------------ */}


        {/* ELIGE LA DURACION */}
        <label htmlFor="duration" className={activityStyles.labelDuration}>
          Duration (hours):
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={activityData.duration}
          onChange={handleInputChange}
          required
          autoComplete="off"
          className={`${activityStyles.inputDuration} ${highlightedFields.includes('duration') ? activityStyles.highlightedField : ''
            }`} />
        {validationErrors.duration && <p className={activityStyles.errorMessage}>{validationErrors.duration}</p>}
        {/* ------------------------------------------------------------ */}


        {/* SELECCIONA ESTACION  */}
        <label htmlFor="season" className={activityStyles.labelSeason}>
          Season:
        </label>
        <select
          id="season"
          name="season"
          value={activityData.season}
          onChange={handleInputChange}
          className={`${activityStyles.selectSeason} ${highlightedFields.includes('season') ? activityStyles.highlightedField : ''
            }`}>
          <option value="">Select season</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
        {validationErrors.season && <p className={activityStyles.errorMessage}>{validationErrors.season}</p>}

        {/* ------------------------------------------------------------ */}


        {/* SELECCIONA UN PAIS*/}
        <div className={activityStyles.tittleFormCountries}>Countries:</div>
        <select
          id="countries"
          name="countries"
          onChange={handleCountryChange}
          value=""
          className={`${activityStyles.selectACountry} ${highlightedFields.includes('countries') ? activityStyles.highlightedField : ''
            }`}>
          <option value="" disabled>Select countries</option>
          {AllCountriesOrderDone.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {validationErrors.countries && <p className={activityStyles.errorMessage}>{validationErrors.countries}</p>}


        {/* Etiquetas de países seleccionados */}
        <div className={activityStyles.allEtiquetaCountries}>
          {arraySelectedCountries.map((countryId) => (
            <div key={countryId} className={activityStyles.aEtiquetaCountry}>
              {/* se determina el country.name */}
              {allCountries.find((country) => country.id === countryId)?.name}

              <button
                type="button"
                onClick={() => handleCountryClick(countryId)}
                className={activityStyles.removeEtiquetaCountry}
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------ */}


        {/* Botón de envío */}
        <button disabled={hasValidationErrors()} type="submit" className={activityStyles.submitButton}>Submit</button>

        {/* ------------------------------------------------------------ */}

        {/* MENSAJES */}
        {/* Mensajes de éxito y error */}
        {successMessage && <p className={activityStyles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={activityStyles.errorMessageGeneral}>{errorMessage}</p>}

        {/* Mensajes de error para cada campo */}





      </form>

    </div>
  );
}
