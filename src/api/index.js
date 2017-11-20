import axios from 'axios';

export const fetchSuggestions = (searchString) => {
    return axios.get(
        `http://api.apixu.com/v1/search.json?key=${process.env.APIXU_KEY}&q=${searchString}`
    ).then((res) => res.data.map((city) => city.name));
};

export const fetchCurrentWeather = (cityName) => {
    return axios.get(
        `http://api.apixu.com/v1/current.json?key=${process.env.APIXU_KEY}&q=${cityName}`
    ).then((res) => {
        const { location, current } = res.data;

        return {
            location: {
                name: location.name,
                country: location.country
            },
            weather: {
                tempC: current.temp_c,
                tempF: current.temp_f,
                isDay: !!current.is_day,
                condition: current.condition.text,
                windKph: current.wind_kph,
                cloud: !!current.cloud
            }
        }
    });
};
