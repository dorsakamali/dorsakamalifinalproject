import { useState } from "react";
import background from "../image/background.jpg";

import Movies from "./Movies";
import axios from "axios";
import {Form, Button} from 'react-bootstrap'
export default function EditForm() {
    const [newMovie, setNewMovie] = useState(
        {
            name: '',
            year: '',
            description: '',
            poster: '',
        });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewMovie((values) => ({ ...values, [name]: value }));
    };

    //connect create to backend 
    const handleSubmit = () => {
        
        //console.log(newMovie);
        // event.preventDefault();
        // axios.post-> send data to localhost8080, then console the data that get it
//post->send
//get-> get
        axios.post("http://localhost:8080/api/movie/update.php", newMovie)
            .then(function (response) {

                console.log(response.data);
                
            });
    };

    // mb-3 -> margin bottom 3
    //bg-warning background color
    
    return (<Form style={{background:"#E1E8ED"}} className="p-3 mb-1  ">
        {/* <img src={background} class="embed-responsive-item" alt="..."></img> */}

        <Form.Group className="mb-0 p-4 text-muted col-xs-2 ">
            <Form.Label  style={{color:"#618685"}} >Movie Name</Form.Label>
            <Form.Control type="text" name="name" className="md-form form-group w-50 p-2 "  style={{background:"#3e4444"}} placeholder="Enter movie name" onChange={handleChange} />
        </Form.Group>

        {/* <Form.Group className="mb-1 p-4 text-muted " controlId="description">
            <Form.Label>Movie description </Form.Label>
            <Form.Control type="text" className="md-form form-group w-50 p-5  " placeholder="Enter movie description" />
        </Form.Group> */}

        <div class="form-outline mb-0 w-50 p-4 text-muted">
            <label class="form-label" style={{color:"#618685"}}  for="form6Example7">Movie description</label>
            <textarea class="form-control" id="form6Example7" rows="4"   name="description"   style={{background:"#3e4444"}}onChange={handleChange}></textarea>

        </div>

        <Form.Group className=" mb-0 w-50 p-4 text-muted col-xs-2" controlId="year"  >
            <Form.Label style={{color:"#618685"}} >Movie Year Released</Form.Label>
            <Form.Control type="text" className="md-form form-group w-50" name="year" placeholder="Year"  style={{background:"#3e4444"}} onChange={handleChange} />
        </Form.Group>

        <div class="form-outline mb-0 w-50 p-4 text-muted">
            <label class="form-label" for="form6Example7" style={{color:"#618685"}} >Movie Poster</label>
            <textarea class="form-control" id="form6Example7" rows="4"  name="poster" style={{background:"#3e4444"}} onChange={handleChange}></textarea>

        </div>

        <Button variant="primary" className="btn-secondary"style={{background:"#bdcebe"}}  onClick={handleSubmit}>
            UPDATE
        </Button>
    </Form>
    );

}