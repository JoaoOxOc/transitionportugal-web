import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   if (typeof window !== "undefined") {
  //     const initialProps = await Document.getInitialProps(ctx);
  //     return { ...initialProps };
  //   }
  // }
  
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="shortcut icon"
            href={require("../public/logotipo_transicaoportugal.svg")}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={require("../public/logotipo_transicaoportugal.svg")}
          />
        </Head>
        <body className="text-gray-800 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;