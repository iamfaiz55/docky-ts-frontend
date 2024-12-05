// import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <h1 className="display-1 text-primary">404</h1>
      <h2 className="text-dark mb-3">Oops! Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <div>
        <Button variant="primary" className="me-3" onClick={handleGoHome}>
          Go to Homepage
        </Button>
        <Button variant="outline-secondary" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
