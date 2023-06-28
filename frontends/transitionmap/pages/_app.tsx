import { Header, Layout, Sider, Title } from "@components/layout";
import { ColorModeContextProvider } from "@contexts";
import { Refine } from "@pankod/refine-core";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import {
  AuthPage,
  CssBaseline,
  ErrorComponent,
  GlobalStyles,
  ReadyPage,
  RefineSnackbarProvider,
  notificationProvider,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import { appWithTranslation, useTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { authProvider } from "src/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "posts",
              list: MuiInferencer,
              edit: MuiInferencer,
              show: MuiInferencer,
              create: MuiInferencer,
              canDelete: true,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          authProvider={authProvider}
          LoginPage={AuthPage}
          i18nProvider={i18nProvider}
        >
          <Component {...pageProps} />
        </Refine>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default appWithTranslation(MyApp);
