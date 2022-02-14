import React,{useEffect} from 'react'
import "./Home.css"
import ProjectAll from "./ProjectAll.js";
import { getAllProject } from '../../actions/projectAllaction';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Homeall = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,projectDetails} = useSelector(
    (state)=>state.projectDetails
  );
  useEffect(() => {
    if(error){
      return alert.error(error);
    }
   dispatch(getAllProject());
  }, [dispatch,error,alert]);
  
  return (
    <>
    {loading ? (
      <Loader />
    ):(
      <>
      <div className='homeallls'> 
    
     <p className='homeHeading'>All Projects</p>
       <div className='btnhomeall'>
       <Button variant="warning">
          <Link to="/admin/allcreate">Add project</Link>
        </Button>
       </div>
        <div className='container containercardhome' id='container'>
          {
            projectDetails && projectDetails.map(project=>(
              <ProjectAll project={project}/>
            ))
          }
        </div> 
     
     </div>
      </>
    )}
    </>
  )
}

export default Homeall
