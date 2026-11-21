import React from "react";
import { Link } from "react-router";


const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        The page you are looking for does not exist. OOps!
      </p>
      <Link to="/" style={styles.link}>
        ⬅️ Go back home
      </Link>
    </div>
  );


};
  const styles = {
    container: {
      textAlign: "center",
      padding: "80px 20px",
      color: "#b33d3d",
    },
    title: {
      fontSize: "72px",
      marginBottom: "20px",
    },
    message: {
      fontSize: "24px",
      marginBottom: "40px",
    },
    link: {
      textDecoration: "none",
      color: "#007BFF",
      fontSize: "18px",
    },
  };

export default NotFoundPage;
