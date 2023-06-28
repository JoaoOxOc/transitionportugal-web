import {React, Fragment, useEffect} from "react";
import ReactDOM from "react-dom";
import Router from "next/router";
import App from 'next/app'
import PageChange from "../components/PageChange/PageChange.js";
import { AuthConsumer, AuthProvider } from '../contexts/authContext';
//import { initGA, logPageView } from '../analytics';
import CookieConsent from "react-cookie-consent";

// Load DM Sans typeface
import 'typeface-dm-sans';

// Load other package css file
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});

Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    //initGA();
    //logPageView();
    Router.events.on('routeChangeComplete', () => {
      //logPageView;
      ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
      document.body.classList.remove("body-page-transition");
    });
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <CookieConsent buttonText="Compreendi" cookieName="TpAcceptedCookies" location="top">
        Apenas utilizamos cookies básicos para gestão de autenticação. Não realizamos qualquer tipo de rastreamento da sua actividade.
      </CookieConsent>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
