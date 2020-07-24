import App from "next/app";
import { appWithTranslation } from "../i18n";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>InkTemplate</title>
      <meta name="description" content="InkTemplate" />
    </Head>
    <Component {...pageProps} />
    <style jsx global>{`
      body {
        margin: 0;
        font-size: 14px;
      }

      a,
      p,
      span,
      button {
        text-decoration: none;
        color: black;
        font-family: "Raleway", sans-serif;
        // font-size: 14px;
        font-size: 2vmin;
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
