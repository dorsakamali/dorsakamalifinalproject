import { useState } from "react";
import background from "../image/background.jpg";

import Movies from "./Movies";
import axios from "axios";
import { Form, Button } from 'react-bootstrap'
export default function AddForm() {

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
    };

    // mb-3 -> margin bottom 3
    //bg-warning background color

    return (<Form style={{ background: "#587e76" }} className="p-3 mb-1  ">
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
    );

}