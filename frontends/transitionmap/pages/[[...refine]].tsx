import {
  NextRouteComponent /*, handleRefineParams */,
  checkAuthentication,
} from "@pankod/refine-nextjs-router";
import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { resource, action, id } = handleRefineParams(context.params?.refine);

  const i18nProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  const { isAuthenticated, ...authenticationValues } =
    await checkAuthentication(authProvider, context);

  if (!isAuthenticated) {
    return {
      ...authenticationValues,
      props: {
        ...("props" in authenticationValues ? authenticationValues.props : {}),
        ...i18nProps,
      },
    };
  }

  return {
    props: {
      ...i18nProps,
    },
  };
};

export default NextRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
