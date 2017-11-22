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
        const { location: { name, country, lat, lon }, current } = res.data;

        return {
            id: `${name}_${country}_${lat}_${lon}`,
            location: {
                name: name,
                country: country,
            },
            weather: {
                isDay: !!current.is_day,
                tempC: current.temp_c,
                windKph: current.wind_kph,
                cloudPc: current.cloud,
                precipitation: current.precip_mm
            }
        };
    });
};
