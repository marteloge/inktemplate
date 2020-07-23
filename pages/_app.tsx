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
  </>
);

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
