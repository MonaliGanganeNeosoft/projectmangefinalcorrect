import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Row, Col, Button } from "react-bootstrap";
import "./SeeAmazing.css";

const SeeAmazing = () => {
  return (
    <>
      <div
        className="ohh"
        style={{
          width: "100vw",
          height: "100vh",
          maxWidth: "100%",
          backgroundColor: "white",
          position: "fixed",
          top: "0%",
        }}
      >
        <div className="m-5" style={{ backgroundColor: "white" }}>
          <Container text-start bg-light className="innertexts">
            <Row className=" m-3 p-5 ">
              <h1 className="mb-2">Project Management</h1>

              <p>
                Project management is the use of specific knowledge, skills,
                tools and techniques to deliver something of value to people.
                The development of software for an improved business process,
                the construction of a building, the relief effort after a
                natural disaster, the expansion of sales into a new geographic
                market—these are all examples of projects.
              </p>
              <div className="innerbtn" style={{ alignItems: "center" }}>
                <p className="w-100 text-start">
                  <span style={{ cursor: "pointer" }}>
                    <Button variant="warning">
                      <Link to="/login">Login</Link>
                    </Button>
                  </span>

                  <span style={{ cursor: "pointer", paddingLeft: "10px" }}>
                    <Button variant="warning">
                      <Link to="/register">Register</Link>
                    </Button>
                  </span>
                </p>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SeeAmazing;
