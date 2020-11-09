import React from "react"
import styles from "./Card.module.css"

export const Card = ({ header, link, linkText, children }) => (
  <div className={styles.container}>
    <div className={styles.header}>{header}</div>
    <div className={styles.content}>{children}</div>
    <a className={styles.button} href={link}>
      {linkText}
    </a>
  </div>
)
