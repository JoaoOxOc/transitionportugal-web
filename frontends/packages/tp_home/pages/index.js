import React, { useEffect, useState } from "react";

import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import { StickyProvider } from '../contexts/app/app.provider';
import Layout from '../layouts/AppModernLayout';

import { i18nextCommon } from "@transitionpt/translations";
import { i18nextHeader } from "@transitionpt/translations";

// page sections
import Banner from '../pageSections/banner/banner';

export default function Home() {
  const [currentLang, setLang] = useState("pt");
  i18nextCommon.changeLanguage(currentLang);
  i18nextHeader.changeLanguage(currentLang);

  useEffect(() => {
      const handleNewMessage = (event) => {
        //setMessages((currentMessages) => currentMessages.concat(event.detail));
        console.log(event);
        setLang(event.detail);
      };
            
      window.addEventListener('newLang', handleNewMessage);
  });

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <Banner/>
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  )
}
