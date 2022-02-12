import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateAdminProject,
  getAdminAllProject,
} from "../../actions/projectAllaction";

import { useAlert } from "react-alert";
import {
  Button,
  Modal,
  Form,
  Container,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { UPDATE_ADMINPROJECT_RESET } from "../../constants/projectAllConstants";
const UpdateProjectAdmin = ({ history, match }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const alert = useAlert();

  // const { error, projectAdminDetailsAll } = useSelector(
  //   (state) => state.projectAdminDetailsAll
  // );
  const { error, projectUpdate } = useSelector(
    (state) => state.projectAdminDetailsAll
  );

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.projectUpdate
  );

  const [title, setTitle] = useState("");

  const projectId = match.params.id;

  useEffect(() => {
    // if (projectUpdate && projectUpdate._id !== projectId) {
    //   dispatch(getAdminAllProject(projectId));
    // } else {
    //   setTitle(projectUpdate.title);
    // }


    if (projectUpdate && projectUpdate._id !== projectId) {
      setTitle(projectUpdate.title);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Project Updated Successfully");
      history.push("/admin/projectDetails");
      dispatch({ type: UPDATE_ADMINPROJECT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    projectId,
    projectUpdate,
    updateError,
  ]);

  const UpdateProjectSubmitHandler = (e) => {
    e.preventDefault();
    setShow(true);
    const myForm = new FormData();

    myForm.set("title",title);

    dispatch(updateAdminProject(projectId, myForm));
  };

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <h1>Edit Project</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            className="createProjectForm"
            encType="multipart/form-data"
            onSubmit={UpdateProjectSubmitHandler}
          >
            <input
              type="text"
              placeholder="Project title"
              required
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Modal.Footer>
              <Button id="createProductBtn" type="submit">
                Edit Project
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
};

export default UpdateProjectAdmin;
