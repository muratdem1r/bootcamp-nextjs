import React from "react";
import styles from "./Card.module.css";

function Card({ children, className }) {
  return (
    <div className={`rounded ${styles.card} ${className}`}>{children}</div>
  );
}

export default Card;
