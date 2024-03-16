const validateActivityForm = (data, fieldName) => {
    console.log('Received data:', data);
    console.log('Received fieldName:', fieldName);
    let error = '';

    switch (fieldName) {
        case 'name':
            if (!data.name.trim()) {
                error = 'Name is required';
            } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
                error = 'Name should not contain special characters or accents';
            }
            break;
        case 'difficulty':
            if (!data.difficulty) {
                error = 'Select the difficulty';
            } else if (isNaN(data.difficulty) || data.difficulty < 1 || data.difficulty > 5) {
                error = 'Difficulty should be between 1 and 5';
            }
            break;
        case 'duration':
            if (data.duration <= 0) {
                error = 'Duration must be greater than zero';
            }
            break;
        case 'season':
            if (!data.season) {
                error = 'Select the season';
            }
            break;
        case 'countries':
            if (!data.countries || data.countries.length === 0) {
                error = 'Select at least one country.';
            }
            break;
        default:
            break;
    }

    return error;
};

export default validateActivityForm;
