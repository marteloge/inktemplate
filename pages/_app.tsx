import App from "next/app";
import { appWithTranslation } from "../i18n";
import Head from "next/head";

import { calculateResponsiveSize } from "./../src/global";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>InkTemplate</title>
      <meta name="description" content="InkTemplate" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
    <style jsx global>{`
      body {
        margin: 0;
        font-size: ${calculateResponsiveSize(12, 14)};
      }

      a,
      p,
      span,
      button {
        text-decoration: none;
        color: black;
        font-family: "Raleway", sans-serif;
      }

      h1,
      h2,
      h3,
      h4 {
        font-family: "Playfair Display", serif;
      }
    `}</style>
  </>
);

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
