import React from "react";
import styles from "./Card.module.css";

function Card({ children, className }) {
  return (
    <div
      className={`rounded shadow-card hover:shadow-cardHover dark:shadow-zinc-600 duration-150 ${styles.card} ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
