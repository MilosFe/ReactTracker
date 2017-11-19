import axios from 'axios';

export const fetchSuggestions = (searchString) => {
    return axios.get(
        `http://api.apixu.com/v1/search.json?key=${process.env.APIXU_KEY}&q=${searchString}`
    ).then((res) => res.data.map((city) => city.name));
};
