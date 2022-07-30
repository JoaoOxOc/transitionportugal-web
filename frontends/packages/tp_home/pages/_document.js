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
            href="/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="96x96"
            href="/inner_transition_V9L_icon.ico"
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