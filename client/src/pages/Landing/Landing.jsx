import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { FaShoppingBag, FaGlobeAfrica, FaHeart } from "react-icons/fa";

function Landing() {
  return (
    <div className={styles.landingContainer}>
      {/* HERO SECTION */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Build Your Store with <span>Habesha Market</span>
          </h1>

          <p>
            A modern Ethiopian ecommerce platform for electronics, fashion, home
            essentials, and authentic local products — all in one place.
          </p>

          <div className={styles.heroButtons}>
            <Link to="/products" className={styles.shopBtn}>
              Explore Products
            </Link>

            <Link to="/register" className={styles.registerBtn}>
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Habesha Market?</h2>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FaGlobeAfrica className={styles.icon} />
            <h3>Local & Trusted</h3>
            <p>Verified Ethiopian sellers with real, quality products.</p>
          </div>

          <div className={styles.featureCard}>
            <FaShoppingBag className={styles.icon} />
            <h3>Modern Shopping</h3>
            <p>Smooth, fast, and secure ecommerce experience.</p>
          </div>

          <div className={styles.featureCard}>
            <FaHeart className={styles.icon} />
            <h3>Built with Care</h3>
            <p>Designed to support local businesses and communities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
