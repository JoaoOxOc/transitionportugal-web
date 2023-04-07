/** @jsxImportSource theme-ui */
import React from "react";
import {
    Box,
    Grid,
    Typography,
    Divider
  } from '@material-ui/core';
// reactstrap components
// import { Spinner } from "reactstrap";

// core components
import { PageTitleStyles as styles } from './pagetitle.style';

export default function PageTitle({pageTitle}) {
  return (
    <div sx={styles.titleBackgroundContainer}>
        <Typography variant="h3">
                {pageTitle}
        </Typography>
    </div>
    // <div
    //   sx={styles.banner}
    //   style={{
    //     backgroundImage:
    //       "url(" + require("../../public/banner/homepage-hero.gif") + ")",
    //   }}
    // >
    // </div>
  );
}
