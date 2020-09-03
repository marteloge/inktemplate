import App from "next/app";
import { appWithTranslation } from "../helpers/i18n";
import Head from "next/head";

import { calculateResponsiveSize } from "../helpers/global";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>InkTemplate</title>
      <meta name="description" content="InkTemplate" />
    </Head>
    <Component {...pageProps} />

    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        font-size: ${calculateResponsiveSize(12, 16)};
        min-height: 100%;
        width: 100%;
      }

      html {
        min-height: 100%;
        width: 100%;
      }

      .container {
        position: absolute;
        min-height: 100%;
        width: 100%;
        background-color: #f2eeeb;
      }

      @font-face {
        font-family: "Playfair Display";
        src: url("/static/fonts/playfair-display-v21-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/playfair-display-v21-latin-regular.woff")
            format("woff")
            url("/static/fonts/playfair-display-v21-latin-regular.ttf")
            format("truetype");
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "Playfair Display";
        src: url("/static/fonts/playfair-display-v21-latin-700.woff2")
            format("woff2"),
          url("/static/fonts/playfair-display-v21-latin-700.woff")
            format("woff"),
          url("/static/fonts/playfair-display-v21-latin-700.ttf")
            format("truetype");
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: "Raleway";
        src: url("/static/fonts/raleway-v17-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/raleway-v17-latin-regular.woff") format("woff"),
          url("/static/fonts/raleway-v17-latin-regular.ttf") format("truetype");
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "Raleway";
        src: url("/static/fonts/raleway-v17-latin-700.woff2") format("woff2"),
          url("/static/fonts/raleway-v17-latin-700.woff") format("woff"),
          url("/static/fonts/raleway-v17-latin-700.ttf") format("truetype");
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: "Dawning of a New Day";
        src: url("/static/fonts/dawning-of-a-new-day-v11-latin-regular.woff2")
          format("woff2");
        font-style: normal;
        font-weight: regular;
      }

      @font-face {
        font-family: "Petit Formal Script";
        font-style: normal;
        font-weight: 400;
        font-display: swap;

        src: url("/static/fonts/petit-formal-script-v8-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/petit-formal-script-v8-latin-regular.woff")
            format("woff"),
          url("/static/fonts/petit-formal-script-v8-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Molle";
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/molle-v9-latin-italic.woff2") format("woff2"),
          url("/static/fonts/molle-v9-latin-italic.woff") format("woff"),
          url("/static/fonts/molle-v9-latin-italic.ttf") format("truetype");
      }
      @font-face {
        font-family: "Clicker Script";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/clicker-script-v8-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/clicker-script-v8-latin-regular.woff")
            format("woff"),
          url("/static/fonts/clicker-script-v8-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Snowburst One";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/snowburst-one-v8-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/snowburst-one-v8-latin-regular.woff")
            format("woff"),
          url("/static/fonts/snowburst-one-v8-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Ranga";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/ranga-v6-latin-regular.woff2") format("woff2"),
          url("/static/fonts/ranga-v6-latin-regular.woff") format("woff"),
          url("/static/fonts/ranga-v6-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Space Mono";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/space-mono-v5-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/space-mono-v5-latin-regular.woff") format("woff"),
          url("/static/fonts/space-mono-v5-latin-regular.ttf")
            format("truetype");
      }
      /* katibeh-regular - latin */
      @font-face {
        font-family: "Katibeh";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/katibeh-v7-latin-regular.woff2") format("woff2"),
          url("/static/fonts/katibeh-v7-latin-regular.woff") format("woff"),
          url("/static/fonts/katibeh-v7-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Bungee Hairline";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/bungee-hairline-v6-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/bungee-hairline-v6-latin-regular.woff")
            format("woff"),
          url("/static/fonts/bungee-hairline-v6-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Ma Shan Zheng";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/ma-shan-zheng-v5-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/ma-shan-zheng-v5-latin-regular.woff")
            format("woff"),
          url("/static/fonts/ma-shan-zheng-v5-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Barriecito";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/barriecito-v3-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/barriecito-v3-latin-regular.woff") format("woff"),
          url("/static/fonts/barriecito-v3-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Bellota";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/bellota-v2-latin-regular.woff2") format("woff2"),
          url("/static/fonts/bellota-v2-latin-regular.woff") format("woff"),
          url("/static/fonts/bellota-v2-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Almendra Display";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/almendra-display-v11-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/almendra-display-v11-latin-regular.woff")
            format("woff"),
          url("/static/fonts/almendra-display-v11-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Cedarville Cursive";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/cedarville-cursive-v11-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/cedarville-cursive-v11-latin-regular.woff")
            format("woff"),
          url("/static/fonts/cedarville-cursive-v11-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Homemade Apple";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/homemade-apple-v10-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/homemade-apple-v10-latin-regular.woff")
            format("woff"),
          url("/static/fonts/homemade-apple-v10-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Rock Salt";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/rock-salt-v10-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/rock-salt-v10-latin-regular.woff") format("woff"),
          url("/static/fonts/rock-salt-v10-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Annie Use Your Telescope";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/annie-use-your-telescope-v10-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/annie-use-your-telescope-v10-latin-regular.woff")
            format("woff"),
          url("/static/fonts/annie-use-your-telescope-v10-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Chewy";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/chewy-v11-latin-regular.woff2") format("woff2"),
          url("/static/fonts/chewy-v11-latin-regular.woff") format("woff"),
          url("/static/fonts/chewy-v11-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Lora";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/lora-v16-latin-regular.woff2") format("woff2"),
          url("/static/fonts/lora-v16-latin-regular.woff") format("woff"),
          url("/static/fonts/lora-v16-latin-regular.ttf") format("truetype");
      }

      @font-face {
        font-family: "Open Sans Condensed";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url("/static/fonts/open-sans-condensed-v14-latin-300.woff2")
            format("woff2"),
          url("/static/fonts/open-sans-condensed-v14-latin-300.woff")
            format("woff"),
          url("/static/fonts/open-sans-condensed-v14-latin-300.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/open-sans-v17-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/open-sans-v17-latin-regular.woff") format("woff"),
          url("/static/fonts/open-sans-v17-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Handlee";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/handlee-v8-latin-regular.woff2") format("woff2"),
          url("/static/fonts/handlee-v8-latin-regular.woff") format("woff"),
          url("/static/fonts/handlee-v8-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Marck Script";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/marck-script-v10-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/marck-script-v10-latin-regular.woff")
            format("woff"),
          url("/static/fonts/marck-script-v10-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Arapey";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/arapey-v8-latin-regular.eot?#iefix")
            format("embedded-opentype"),
          url("/static/fonts/arapey-v8-latin-regular.woff2") format("woff2"),
          url("/static/fonts/arapey-v8-latin-regular.woff") format("woff"),
          url("/static/fonts/arapey-v8-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Poiret One";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/poiret-one-v8-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/poiret-one-v8-latin-regular.woff") format("woff"),
          url("/static/fonts/poiret-one-v8-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Prata";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/prata-v11-latin-regular.woff2") format("woff2"),
          url("/static/fonts/prata-v11-latin-regular.woff") format("woff"),
          url("/static/fonts/prata-v11-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Sacramento";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/sacramento-v7-latin-regular.eot?#iefix")
            format("embedded-opentype"),
          url("/static/fonts/sacramento-v7-latin-regular.woff2") format("woff2"),
          url("/static/fonts/sacramento-v7-latin-regular.woff") format("woff"),
          url("/static/fonts/sacramento-v7-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Great Vibes";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/great-vibes-v7-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/great-vibes-v7-latin-regular.woff") format("woff"),
          url("/static/fonts/great-vibes-v7-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Courgette";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/courgette-v7-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/courgette-v7-latin-regular.woff") format("woff"),
          url("/static/fonts/courgette-v7-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Satisfy";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/satisfy-v10-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/satisfy-v10-latin-regular.woff") format("woff"),
          url("/static/fonts/satisfy-v10-latin-regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Amatic SC";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/amatic-sc-v13-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/amatic-sc-v13-latin-regular.woff") format("woff"),
          url("/static/fonts/amatic-sc-v13-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Shadows Into Light";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/shadows-into-light-v9-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/shadows-into-light-v9-latin-regular.woff")
            format("woff"),
          url("/static/fonts/shadows-into-light-v9-latin-regular.ttf")
            format("truetype");
      }

      @font-face {
        font-family: "Pacifico";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/pacifico-v16-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/pacifico-v16-latin-regular.woff") format("woff"),
          url("/static/fonts/pacifico-v16-latin-regular.ttf") format("truetype");
      }

      @font-face {
        font-family: "Indie Flower";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/indie-flower-v11-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/indie-flower-v11-latin-regular.woff")
            format("woff"),
          url("/static/fonts/indie-flower-v11-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Dancing Script";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/dancing-script-v15-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/dancing-script-v15-latin-regular.woff")
            format("woff"),
          url("/static/fonts/dancing-script-v15-latin-regular.ttf")
            format("truetype");
      }
      @font-face {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/quicksand-v21-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/quicksand-v21-latin-regular.woff") format("woff"),
          url("/static/fonts/quicksand-v21-latin-regular.ttf")
            format("truetype");
      }

      @font-face {
        font-family: "Anton";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/anton-v11-latin-regular.woff2") format("woff2"),
          url("/static/fonts/anton-v11-latin-regular.woff") format("woff"),
          url("/static/fonts/anton-v11-latin-regular.ttf") format("truetype");
      }

      @font-face {
        font-family: "Lobster";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/static/fonts/lobster-v22-latin-regular.woff2")
            format("woff2"),
          url("/static/fonts/lobster-v22-latin-regular.woff") format("woff"),
          url("/static/fonts/lobster-v22-latin-regular.ttf") format("truetype");
      }

      a,
      p,
      span,
      button {
        margin: 0;
        text-decoration: none;
        color: black;
        font-family: "Raleway";
        font-weight: 400;
        font-size: ${calculateResponsiveSize(12, 16)};
      }

      h1,
      h2,
      h3,
      h4 {
        font-family: "Raleway";
        font-weight: bold;
        margin-bottom: 10px;
      }

      input,
      textarea,
      select,
      button {
        font-family: "Raleway";
        font-size: ${calculateResponsiveSize(12, 16)};
      }

      button {
        padding: 10px 20px;
        background: white;
        border-radius: 5px;
        outline: none;
        box-shadow: none;
        border: 1px solid black;
        min-height: 45px;
      }

      a,
      button {
        cursor: pointer;
      }

      button:disabled {
        padding: 10px 20px;
        background-color: lightgrey;
        border: none;
        color: white;
      }

      .strike {
        display: inline-block;
        position: relative;
        font-size: 30px;
        background-color: transparent;
        z-index: 1;
        padding: 10px 0;
        border: none;
      }

      .strike::after {
        content: "";
        display: block;
        width: 100%;
        height: 7px;
        background: #32c0b0;
        position: absolute;
        bottom: 30%;
        box-shadow: 0px 0px 2px 2px #32c0b0;
        border-radius: 1px;
        z-index: -1;
      }

      .strike:hover ::after {
        transform: scaleX(1.09);
        padding-left: 10px;
        transition: all 0.4s ease-in-out 0s;
      }

      button.strike:disabled {
        background-color: transparent;
        padding: 0;
        color: gray;
        cursor: not-allowed;
      }

      .strike:disabled::after {
        box-shadow: none;
        height: 0;
      }
    `}</style>
  </>
);

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
