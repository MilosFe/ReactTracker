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

This app was built in accordance with the designs shown [here][arbetsprov].
It has been tested for consistency across Chrome, Firefox, and Safari and is
responsive for all device sizes with a change into Mobile design at 600px
width. Behind the scenes, it uses React and Redux using the [ducks][ducks]
architecture pattern. 

It also comes with a few additional treats beyond the
main specifications:

- If you add a bunch of weather reports in succession, you'll notice that
the colors are seemingly random. While they are generally as random as
possible, they adhere to two important rules:
  + No two consecutive reports have the same color, keeping color sequences
spread out, especially in the single-column view on mobile.
  + Once a color is set for a report, it must persist even when other reports
are deleted. This can result in clumping of colors depending on order of
deletion, but this rule is considered more important than the first for the
sake of readability.

- The search box includes an autosuggest using values from Apixu. This can be
helpful to get differences between identically named cities since Apixu's
weather api only makes a best (though reasonably accurate) guess at any
city names. Note that this search box does differ
slightly from the designs in that it clears the value after each selection -
I chose this in order to allow rapidly adding different cities without
overriding differing browser defaults on handling input fields in
relation to focus, selections, and click handling.

- The icons shown in each report are not random. They are programmed to check
the actual weather conditions for that location and give an appropriate
graphical interpretation. Theoretically this could be done more accurately
by using Apixu's text interpretation of the conditions, but without a publicly
available list of possible values to be returned, computation on our end is
required to avoid using fallback icons too often. Alternatively, they also
provide a link to their own icons, but this particular project uses
the [Meteocon][Meteocon] library, as per the designs.

# Known Issues / Future Options

1. One problem that currently exists is that resizing *between* mobile and desktop
sizes causes the colors to be recalculated as the parent re-renders. This can
be fixed by moving color management into redux state along with the reports
themselves but I was trying to avoid putting such specific styling concerns
into the overall app state. I leave this as a minor issue for now since real
users would never resize their screens as much as a developer would (if ever),
but it would be worth addressing.

2. It would be a useful feature to allow the cards to be clicked and either
open a modal window or expand to show more data, such as the full details
of the location and more specifics on the weather conditions.

Have fun playing with it, and let me know if you have any questions!

[Apixu]: https://www.apixu.com/
[arbetsprov]: https://github.com/Vinnovera/arbetsprov
[ducks]: https://github.com/erikras/ducks-modular-redux
[Meteocon]: http://www.alessioatzeni.com/meteocons/
