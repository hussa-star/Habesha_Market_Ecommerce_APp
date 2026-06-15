// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Header.module.css";

// // mobile menu icons
// import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

// function Header() {
//   const navigate = useNavigate();

//   /*
//   =========================
//   CHECK LOGIN STATUS
//   =========================
//   */
//   const isLoggedIn = !!localStorage.getItem("token");

//   /*
//   =========================
//   MOBILE MENU STATE
//   =========================
//   */
//   const [menuOpen, setMenuOpen] = useState(false);

//   /*
//   =========================
//   LOGOUT FUNCTION
//   =========================
//   */
//   function handleLogout() {
//     localStorage.removeItem("token");

//     // redirect to login page
//     navigate("/login");
//   }

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         {/* ================= LOGO ================= */}
//         <div className={styles.logo} onClick={() => navigate("/")}>
//           Habesha<span>Market</span>
//         </div>

//         {/* ================= MOBILE ICON ================= */}
//         <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </div>

//         {/* ================= NAVIGATION ================= */}
//         <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
//           {/* Home */}
//           <p
//             onClick={() => {
//               navigate("/");
//               setMenuOpen(false);
//             }}
//           >
//             Home
//           </p>

//           {/* Products */}
//           <p
//             onClick={() => {
//               navigate("/products");
//               setMenuOpen(false);
//             }}
//           >
//             Products
//           </p>

//           {/* Cart */}
//           <p
//             onClick={() => {
//               navigate("/cart");
//               setMenuOpen(false);
//             }}
//           >
//             Cart <FaShoppingCart />
//           </p>

//           {/* Orders (only meaningful if logged in) */}
//           {isLoggedIn && (
//             <p
//               onClick={() => {
//                 navigate("/orders");
//                 setMenuOpen(false);
//               }}
//             >
//               Orders
//             </p>
//           )}

//           {/* ================= AUTH ================= */}
//           {isLoggedIn ? (
//             <button className={styles.authBtn} onClick={handleLogout}>
//               Logout
//             </button>
//           ) : (
//             <button
//               className={styles.authBtn}
//               onClick={() => {
//                 navigate("/login");
//                 setMenuOpen(false);
//               }}
//             >
//               Login
//             </button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import styles from "./Header.module.css";
import { CartContext } from "../CartProvider/CartContext";

// Added FaMoon and FaSun for the dark mode toggle
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { cartCount, fetchCartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  // 2. Check local storage for saved theme when the app loads
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.remove("dark-mode");
    setIsDarkMode(false);
  } else {
    document.body.classList.add("dark-mode");
    setIsDarkMode(true);
  }
}, []);

  // 3. Simple function to flip between Light and Dark
function toggleTheme() {
  if (isDarkMode) {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    setIsDarkMode(false);
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    setIsDarkMode(true);
  }
}

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setMenuOpen(false);
  }
// cart count function

   


  return (
    <header
      className={`${styles.header} ${isDarkMode ? styles.darkHeader : ""}`}
    >
      <div className={styles.container}>
        {/* BRAND LOGO */}
        <div className={styles.logo} onClick={() => navigate("/")}>
          Habesha<span>Market</span>
        </div>

        <div className={styles.rightControls}>
          {/* THEME TOGGLE BUTTON */}
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {isDarkMode ? (
              <FaSun color="#ffcd3c" size={20} />
            ) : (
              <FaMoon color="#4a4a4a" size={20} />
            )}
          </button>

          {/* MOBILE MENU ICON */}
          <div
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>

          {/* admin links */}
          {/* NEW: Admin Button visible ONLY for admins */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={styles.adminLink}
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {user && (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>
              <Link
                to="/cart"
                className={styles.cartLink}
                onClick={() => setMenuOpen(false)}
              >
                <FaShoppingCart size={18} />
                <span>Cart ({cartCount})</span>
              </Link>
            </>
          )}

          {user ? (
            <div className={styles.userSection}>
              <span className={styles.greeting}>
                <FaUserCircle size={20} />
                Hi, {user.username}
              </span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <button
                className={styles.loginBtn}
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Sign In
              </button>
              <button
                className={styles.registerBtn}
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
              >
                Create Account
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
