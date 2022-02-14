import React from "react";
import { Link } from "react-router-dom";
import { Card, Img } from "react-bootstrap";
import "./ProjectAllrename";
const ProjectAll = ({ project }) => {
  return (
    <>
      <Link className="projectCard" to={`/projectDetail/${project._id}`}>
      <div className='innerhomecomponent'>
        <Card style={{ marginBottom: "50px" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {project.title}
            </Card.Title>

            <Card.Img
              variant="top"
              src={project.images}
              alt={project.title}
              style={{ height: "150px" }}
            />
            <p style={{ textAlign: "center" }}>{project.text}</p>
          </Card.Body>
        </Card>
        </div>
      </Link>
    </>
  );
};

export default ProjectAll;
