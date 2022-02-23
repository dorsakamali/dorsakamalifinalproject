import { useState } from "react";
import background from "../image/background.jpg";
import Movies from "./Movies";
import axios from "axios";
import { Form, Button ,Navbar, NavLink, Nav} from 'react-bootstrap'
import { BrowserRouter, Switch, Route ,Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function Header() {


    const [name, setName] = useState();
    const [year, setYear] = useState();
    const [description, setDescription] = useState();
    const [poster, setPoster] = useState();

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleYear = (event) => {
        setYear(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handlePoster = (event) => {
        setPoster(event.target.value);
    }


    //connect create to backend 
    const handleSubmit = () => {
        //console.log(newMovie);
        // event.preventDefault();
        // axios.post-> send data to localhost8080, then console the data that get it
        //post->send
        //get-> get
        axios.post("http://localhost:8080/api/movie/create.php", {
            name: name,
            year: year,
            description: description,
            poster: poster,
        })
            .then(function (response) {
            });
            // when we add movie and click on add, window close and reload automaticly
            window.location.reload();
    };




const [addOpen, setAddOpen]=  useState(false);
// FOR CLOSE AND OPEN MODAL
 const handleAddModal = ()=>{setAddOpen(!addOpen)}

    const [isActive, setActive] = useState(true);
    const gridView = () => {
        if (!isActive)
        setActive(true);
    };

    const listView = () =>{
        if(isActive)
        setActive(false);
    };


return(
    <>
    <Navbar style={{background:"#618685"}}  variant="dark" className=" w-100">
    
        <Navbar.Brand title={"movie recommendation"} className="ms-3">Movie</Navbar.Brand>
        <Nav className="me-auto">
           <Nav.Link  to="/" className="link">HOME</Nav.Link >
            <Nav.Link  to="/addForm" className="link" onClick={handleAddModal} >ADD</Nav.Link >
            <Nav.Link  to="/" className="link" onClick={gridView}> GRID VIEW </Nav.Link >
            <Nav.Link  to="/" className="link" onClick={listView} >LIST VIEW</Nav.Link >
            
        </Nav>
    
</Navbar>
<Movies show={isActive} />

<Modal
  open={addOpen}
  onClose={handleAddModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Form style={{ background: "#587e76" }} className="p-3 mb-1  ">
        {/* <img src={background} class="embed-responsive-item" alt="..."></img> */}

        <Form.Group className="mb-0 p-4 text-muted col-xs-2 ">
            <Form.Label style={{ color: "#bdcebe" }} >Movie Name</Form.Label>
            <Form.Control type="text" name="name" className="md-form form-group w-50 p-2 " style={{ background: "#3e4444" }} placeholder="Enter movie name" onChange={handleName} />
        </Form.Group>

        <div class="form-outline mb-0 w-50 p-4 text-muted">
            <label class="form-label" style={{ color: "#bdcebe" }} for="form6Example7">Movie description</label>
            <textarea class="form-control" id="form6Example7" rows="4" name="description" style={{ background: "#3e4444" }} onChange={handleDescription}></textarea>

        </div>

        <Form.Group className=" mb-0 w-50 p-4 text-muted col-xs-2" controlId="year"  >
            <Form.Label style={{ color: "#bdcebe" }} >Movie Year Released</Form.Label>
            <Form.Control type="text" className="md-form form-group w-50" name="year" placeholder="Year" style={{ background: "#3e4444" }} onChange={handleYear} />
        </Form.Group>

        <div class="form-outline mb-0 w-50 p-4 text-muted">
            <label class="form-label" for="form6Example7" style={{ color: "#bdcebe" }} >Movie Poster</label>
            <textarea class="form-control" id="form6Example7" rows="4" name="poster" style={{ background: "#3e4444" }} onChange={handlePoster}></textarea>

        </div>
       


        <Button  variant="primary" className="btn-secondary App" style={{ background: "#bdcebe" }} onClick={handleSubmit}>
            ADD
        </Button>
    </Form>
  </Box>
</Modal>

</>


);
}