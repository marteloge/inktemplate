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
      .container {
        position: absolute;
        min-height: 100%;
        width: 100%;
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

      body {
        min-height: 100vh;
        margin: 0;
        font-size: ${calculateResponsiveSize(12, 16)};
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
        cursor: pointer;
      }
    `}</style>
  </>
);

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
