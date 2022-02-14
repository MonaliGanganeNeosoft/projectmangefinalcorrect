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
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const styled = {
  margin: 0,
  fontSize: "small",
  color: "red",
};
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForURL = RegExp(
  /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/
);

const UpdateProjectAdmin = ({ history, match }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, projectAdminDetailsAll} = useSelector(
    (state) => state.projectAdminDetailsAll
  );

  const {
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.projectUpDel);

  const [title, setTitle] = useState("");
  const [demo_URL, setDemoUrl] = useState("");
  const [github_URL, setGithubUrl] = useState("");

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [text, setText] = useState([]);

  let [info, setInfo] = useState({ title: "", tags: "" });

  let editorState = EditorState.createEmpty();
  let [description, setDescription] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };
  const [errors, seterrors] = useState({
    errTitle: "",
    errText: "",
    submit_error: "",
    errgithub: "",
    errdemo: "",
  });
  const [data, setdata] = useState({
    title: "",
    text: "",
    github_URL: "",
    demo_URL: "",
  });
  // for validation purpose
  const handler = (event) => {
    const { name, value } = event.target;
    let error = "";
    switch (name) {
      case "title":
        error = regForName.test(value) ? "" : "Invalid title";
        seterrors({ ...errors, errTitle: error });
        break;
      case "text":
        error = regForName.test(value) ? "" : "Invalid text";
        seterrors({ ...errors, errText: error });
        break;

      case "demo_URL":
        error = regForURL.test(value) ? "" : "Invalid Demo Link";
        seterrors({ ...errors, errdemo: error });
        break;

      case "github_URL":
        error = regForURL.test(value) ? "" : "Invalid Github Link";
        seterrors({ ...errors, errgithub: error });
        break;
    }
    console.log(errors);
    setdata({ ...data, [name]: value });
  };

  const updateProjectImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const projectId = match.params.id;
  console.log(projectId)
 
   useEffect(() => {
    if (projectAdminDetailsAll && projectAdminDetailsAll._id == projectId) {
    //   console.log(projectId)
    //   dispatch(getAdminAllProject(projectId));
    //   console.log(projectId)
    // } else {
      setTitle(projectAdminDetailsAll.title);
      console.log(title)
      setDemoUrl(projectAdminDetailsAll.demo_URL);
      setGithubUrl(projectAdminDetailsAll.github_URL);
      setOldImages(projectAdminDetailsAll.images);
      setText(projectAdminDetailsAll.text);
      setDescription(projectAdminDetailsAll.description);
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
    // projectUpDel,
    projectAdminDetailsAll,
    updateError,
  ]);

  const UpdateProjectSubmitHandler = (e) => {
    e.preventDefault();
    setShow(true);
    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("demo_URL", demo_URL);
    myForm.set("github_URL", github_URL);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    myForm.append("description", info.description.value);
    myForm.set("text", text);
    dispatch(updateAdminProject(projectId, myForm));
  };

 
  return (
    <>
      <Modal.Dialog>
        <Modal.Header >
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
             {errors.submit_error.length != 0 && (
              <alert severity="error">{errors.submit_error}</alert>
            )}{" "}

           
            <Form.Group>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Project Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{  marginTop: "10px" }}
                  onBlur={handler}
                />
              </InputGroup>
              <p style={styled}>{errors.errTitle}</p>
            </Form.Group>

            <div id="createProjectFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProjectImagesChange}
                multiple
                style={{  marginTop: "10px" }}
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Project Preview" />
                ))}
            </div>
            <div id="createProjectFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Project edit Preview" />
              ))}
            </div>
            
            <Form.Group>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Project text"
                  name="text"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{  marginTop: "10px" }}
                  onBlur={handler}
                />
              </InputGroup>
              <p style={styled}>{errors.errText}</p>
            </Form.Group>

            <Form.Group className="mb-3 mt-3">
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                editorStyle={{ border: "2px solid white" }}
              />

              <textarea
                style={{ display: "none" }}
                disabled
                ref={(val) => (info.description = val)}
                value={draftToHtml(
                  convertToRaw(description.getCurrentContent())
                )}
              />
            </Form.Group>

            
            <Form.Group>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Project demo url"
                  required
                  name="demo_URL"
                  value={demo_URL}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  style={{  marginTop: "10px" }}
                  onBlur={handler}
                />
              </InputGroup>
              <p style={styled}>{errors.errdemo}</p>
            </Form.Group>
           
             <Form.Group>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Project githhub url"
                  name="github_URL"
                  required
                  demo_URL={github_URL}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  style={{  marginTop: "10px" }}
                  onBlur={handler}
                />
              </InputGroup>
              <p style={styled}>{errors.errgithub}</p>
            </Form.Group>

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


