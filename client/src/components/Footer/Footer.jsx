import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* BRAND SECTION */}
        <h3 className={styles.logo}>Habesha Market</h3>

        {/* DESCRIPTION */}
        <p className={styles.description}>
          Ethiopia's trusted online marketplace for electronics, fashion, home
          products, and everyday essentials.
        </p>

        {/* DIVIDER */}
        <div className={styles.divider}></div>

        {/* COPYRIGHT */}
        <small className={styles.copy}>
          © 2026 Habesha Market. All rights reserved.developed by 
          <a
            href="https://github.com/hussa-star"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hussa Star
          </a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
