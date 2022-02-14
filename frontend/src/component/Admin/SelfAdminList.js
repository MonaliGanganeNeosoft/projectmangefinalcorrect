import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminAllProject,
  deleteAdminProject,
} from "../../actions/projectAllaction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_ADMINPROJECT_RESET } from "../../constants/projectAllConstants";
import { Button } from "react-bootstrap";
import htmlToDraft from "html-to-draftjs";

const SelfAdminList = ({ history, params }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, projectAdminDetailsAll } = useSelector(
    (state) => state.projectAdminDetailsAll
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.projectUpDel
  );

  const deleteProjectHandler = (id) => {
    dispatch(deleteAdminProject(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Project Deleted Successfully");
      history.push("/admin/projectDetails");
      dispatch({ type: DELETE_ADMINPROJECT_RESET });
    }
    dispatch(getAdminAllProject());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  return (
    <>
      <div>
        <p className="homeHeading">Self Projects</p>
        <div className="btnhomeall">
          <Button variant="warning">
            <Link to="/admin/project">Add Project</Link>
          </Button>
        </div>
        <div className="blacks1" style={{ textAlign: "center" }}>
          {projectAdminDetailsAll &&
            projectAdminDetailsAll.map((item) => (
              <>
                <div
                  className="innerc"
                  style={{ border: "2px solid black", marginTop: "30px" }}
                >
                  <p>Project_Id : {item._id}</p>
                  <p>Title : {item.title}</p>
                  <p>
                    <img src={item.images} style={{ width: "300px" }} />
                  </p>
                  <p>Text : {item.text}</p>

                  <p>
                    Description :{" "}
                    <i
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></i>
                  </p>

                  <p>
                    Demo_URL :
                    <a href={`${item.demo_URL}`} target="_blank">
                      {" "}
                      {item.demo_URL}
                    </a>
                  </p>

                  <p>
                    Github_URL :
                    <a href={`${item.github_URL}`} target="_blank">
                      {" "}
                      {item.github_URL}
                    </a>
                  </p>

                  <Button variant="warning">
                    <Link to={`/admin/projectAdminDetailsAll/${item._id}`}>
                      
                      Edit
                    </Link>
                  </Button>

                  <Button
                    variant="danger"
                    style={{ marginLeft: "20px" }}
                    onClick={() => deleteProjectHandler(`${item._id}`)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default SelfAdminList;
