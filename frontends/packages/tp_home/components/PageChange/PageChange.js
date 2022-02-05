/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React from "react";

// reactstrap components
// import { Spinner } from "reactstrap";

// core components
import { PageChangeStyles as styles } from './pagechange.style';

export default function PageChange(props) {
  return (
    <div
      sx={styles.fullBG}
      style={{
        backgroundImage:
          "url(" + require("../../public/banner/homepage-hero.gif") + ")",
      }}
    >
      <div sx={styles.backgroundOverlay}>
        <h4>
          A carregar conteúdo de: {props.path}
        </h4>
      </div>
    </div>
  );
}
