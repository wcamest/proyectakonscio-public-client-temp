"use client";

import React from "react";
import styles from "./FlipBox.module.css";

type Props = {
  className?: string;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  flipDirection?: "x" | "y"; // Dirección del giro
  flipSide?: "positive" | "negative"; // Sentido del giro
};

const FlipBox = (props: Props) => {
  const {
    className,
    frontContent,
    backContent,
    flipDirection = "y",
    flipSide = "positive",
  } = props;

  return (
    <div
      className={`${styles.flip_box} ${
        styles[`flip_box_${flipDirection}_${flipSide}`]
      } ${className}`}
    >
      <div className={`${styles.flip_box_inner}`}>
        <div className={`${styles.flip_box_front}`}>{frontContent}</div>
        <div className={`${styles.flip_box_back}`}>{backContent}</div>
      </div>
    </div>
  );
};

export default FlipBox;
