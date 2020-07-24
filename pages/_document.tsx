import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.initialLanguage}>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>
          {`
            @font-face {
              font-family: "Raleway";
              src: url("/static/fonts/raleway-v17-latin-regular.ttf");
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: "Raleway";
              src: url("/static/fonts/raleway-v17-latin-700.ttf");
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: "Playfair Display";
              src: url("/static/fonts/playfair-display-v21-latin-regular.ttf");
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: "Playfair Display";
              src: url("/static/fonts/playfair-display-v21-latin-700.ttf");
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `}
        </style>
      </Html>
    );
  }
}

export default MyDocument;
