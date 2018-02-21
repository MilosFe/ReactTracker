# Getting Started

Install modules with:

`npm install`

To run tests, lint, and server:

`npm run start`

Alternatively, run each of these individually with:

`npm run lint`

`npm run test`

`npm run dev`

In order to successfully fetch data from the [Apixu][Apixu] api, you'll need
to have a `.env` file at the root of the project. To obtain this key, sign up
for a free account on their website.

``` .env
APIXU_KEY=<YOUR_API_KEY>
```

Don't worry about adding it directly - simply run the `start` or `dev` scripts
and they'll prompt you for the key if the file doesn't exist yet.



[Apixu]: https://www.apixu.com/
[Meteocon]: http://www.alessioatzeni.com/meteocons/
