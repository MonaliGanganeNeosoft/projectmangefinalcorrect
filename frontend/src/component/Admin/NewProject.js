import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProjectAdmin,
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
import { NEW_PROJECT_RESET } from "../../constants/projectAllConstants";
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
// const regForText=RegExp(/^[a-zA-Z]*$/);
const regForText=RegExp(/^[a-zA-Z\s]*$/);


const regForURL = RegExp(
  /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/
); 

const NewProject = ({ history }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, success } = useSelector((state) => state.newProject);

  const [title, setTitle] = useState("");
  const [demo_URL, setDemoUrl] = useState("");
  const [github_URL, setGithubUrl] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  let [info, setInfo] = useState({ title: "", tags: "" });

  let editorState = EditorState.createEmpty();
  let [description, setDescription] = useState(editorState);
  const [text, setText] = useState([]);

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
        error = regForText.test(value) ? "" : "Invalid text";
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


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Project Created Successfully");
      history.push("/admin/projectDetails");
      dispatch({ type: NEW_PROJECT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProjectSubmitHandler = (e) => {
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
    dispatch(createProjectAdmin(myForm));
  };

  const createProjectImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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

  return (
    <>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>
            <h1>Add Self Project</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            className="createProjectForm"
            encType="multipart/form-data"
            onSubmit={createProjectSubmitHandler}
          >
             {errors.submit_error.length != 0 && (
              <alert severity="error">{errors.submit_error}</alert>
            )}{" "}
            {/* <div>
              <input
                type="text"
                placeholder="Project title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div> */}
            <Form.Group>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Project title"
                  required
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
                onChange={createProjectImagesChange}
                multiple
              />
            </div>
            <div id="createProjectFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Project Preview" />
              ))}
            </div>
            {/* <div>
              <input
                type="text"
                placeholder="Project text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div> */}
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

            {/* <div>
              <input
                type="text"
                placeholder="Project demo url"
                required
                value={demo_URL}
                onChange={(e) => setDemoUrl(e.target.value)}
              />
            </div> */}
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
            {/* <div>
              <input
                type="text"
                placeholder="Project githhub url"
                required
                value={github_URL}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div> */}
            <Form.Group>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Project githhub url"
                  name="github_URL"
                  required
                  value={github_URL}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  style={{  marginTop: "10px" }}
                  onBlur={handler}
                />
              </InputGroup>
              <p style={styled}>{errors.errgithub}</p>
            </Form.Group>

            <Button id="createProductBtn" type="submit">
              Add Project
            </Button>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
};

export default NewProject;
