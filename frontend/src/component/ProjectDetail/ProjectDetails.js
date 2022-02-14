import React, { useEffect } from "react";
import { Card, Img } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllProjectDetails } from "../../actions/projectAllaction";
import { useAlert } from "react-alert";

const ProjectDetails = ({ match }) => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { projectDetail, loading, error } = useSelector(
    (state) => state.projectDetail
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProjectDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <>
      <div className="ProjectDetails" style={{ border: "2px solid black",height:"600px" }}>
        <div
          className="firstimg"
          style={{ height: "500px", textAlign: "center" }}
        >
          <p style={{ marginTop: "20px" }}>Title : {projectDetail.title}</p>

          <img src={projectDetail.images} style={{ width: "400px" }} />
          <p style={{ marginTop: "20px" }}>Text : {projectDetail.text}</p>

          <p>
            Description :{" "}
            <i
              dangerouslySetInnerHTML={{ __html: projectDetail.description }}
            ></i>
          </p>

          <p>
            Demo_URL :
            <a href={`${projectDetail.demo_URL}`} target="_blank">
              {" "}
              {projectDetail.demo_URL}
            </a>
          </p>
          <p>
            Github_URL :
            <a href={`${projectDetail.github_URL}`} target="_blank">
              {" "}
              {projectDetail.github_URL}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
