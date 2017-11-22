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

# Description

This app was built in accordance with the designs [shown here][arbetsprov].
It has been tested for consistency across Chrome, Firefox, and Safari and is
responsive for all device sizes with a change into Mobile design at 600px
width. Behind the scenes, it uses React and Redux using the [ducks][ducks]
architecture pattern. 

It also comes with a few additional treats beyond the
main specifications:

- If you add a bunch of weather reports in succession, you'll notice that
the colors are seemingly random. In fact, they adhere to certain rules:
  1. All colors are as random as possible.
  2. No two consecutive reports have the same color, avoiding large patches
of the same color, especially in the single-column view on mobile.
  3. Once a color is set for a report, it must persist even when other reports
are deleted. This can result in clumping of colors depending on how items are
deleted, but this rule is considered more important than rule #2 for the sake
of readability.

- The search box includes an autosuggest using values from Apixu. This can be
helpful to get differences between identically named cities since Apixu's
weather api only makes a best (though reasonably accurate) guess at any
request for a current weather report. Note that this search box does differ
slightly from the designs in that it clears the value after each selection -
I chose this in order to allow rapidly adding different cities without
overriding differing browser defaults on handling input fields in
relation to focus, selections, and click handling.

- The icons shown in each report are not random. They are programmed to check
the actual weather conditions for that location and give the best
graphical interpretation. Theoretically this could be done more accurately
by using Apixu's text interpretation of the conditions, but without a publicly
available list of possible values to be returned, computation on our end is
required to avoid using fallback icons too often. Alternatively, they also
provide a link to their own icons, but this particular project needed to use
the Meteocon[Meteocon] library.

Have fun playing with it, and let me know if you have any questions!

[Apixu]: https://www.apixu.com/
[arbetsprov]: https://github.com/Vinnovera/arbetsprov
[ducks]: https://github.com/erikras/ducks-modular-redux
[Meteocon]: http://www.alessioatzeni.com/meteocons/
