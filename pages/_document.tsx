import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.initialLanguage}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          body {
            margin: 0;
          }

          a {
            text-decoration: none;
            color: black;
          }
        `}</style>
      </Html>
    );
  }
}

export default MyDocument;
