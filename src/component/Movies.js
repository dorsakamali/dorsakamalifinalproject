import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Button ,Form,FormControl} from "react-bootstrap";
import data from "./data.json";
import './Grid.css';
import './List.css';
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





const MovieCard = ({show, movie}) => {
  var change = show ? "grid" : "list";


const [open,setOpen]=useState(false);

const [form,setForm]=useState(movie);


function handleForm(e){

setForm({...form,[e.target.name]:e.target.value});
}

function handleModal(){
  setOpen(!open);

}
async function handleEdit(){
await axios.post("http://localhost:8080/api/movie/update.php",form);
 
 window.location.reload();
}

async function handleDelete(){
await axios.get("http://localhost:8080/api/movie/delete.php?id="+movie.id);
 window.location.reload();
}

return (<>



<Modal
  open={open}
  onClose={handleModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Form style={{ backgroundImage: `url(${movie.poster})`,backgroundPosition:"center",backgroundRepeat:"no-repeat" ,backgroundSize:"cover"}} className="p-3 mb-1  ">
        {/* <img src={background} class="embed-responsive-item" alt="..."></img> */}

        <Form.Group className="mb-0 p-4 text-muted col-xs-2 ">
            <Form.Label style={{ color: "#bdcebe" }} >Movie Name</Form.Label>
            <Form.Control type="text" name="name" defaultValue={movie.name} className="md-form form-group w-50 p-2 " style={{ background: "#3e4444" }} placeholder="Enter movie name" onChange={handleForm} />
        </Form.Group>

        <div class="form-outline mb-0 w-50 p-4 text-muted">
            <label class="form-label" style={{ color: "#bdcebe" }} for="form6Example7">Movie description</label>
            <textarea class="form-control" id="form6Example7" rows="4" name="description" style={{ background: "#3e4444" }} onChange={handleForm}>{movie.description}</textarea>

        </div>

        <Form.Group className=" mb-0 w-50 p-4 text-muted col-xs-2" controlId="year"  >
            <Form.Label style={{ color: "#bdcebe" }} >Movie Year Released</Form.Label>
            <Form.Control type="text" className="md-form form-group w-50" defaultValue={movie.year} name="year" placeholder="Year" style={{ background: "#3e4444" }} onChange={handleForm} />
        </Form.Group>

        <div class="form-outline mb-0 w-50 p-4 text-muted">
            <label class="form-label" for="form6Example7" style={{ color: "#bdcebe" }} >Movie Poster</label>
            <textarea class="form-control" id="form6Example7" rows="4" name="poster" style={{ background: "#3e4444" }} onChange={handleForm}>{movie.poster}</textarea>

        </div>
       


        <Button  variant="primary" className="btn-secondary App" style={{ background: "#bdcebe" }} onClick={handleEdit} >
            EDIT
        </Button>
         <Button  variant="primary" className="btn-secondary App" style={{ background: "#bdcebe" }} onClick={handleDelete}>
            DELETE
        </Button>
    </Form>
  </Box>
</Modal>


      <Col className={`m-2 ${change}`} onClick={handleModal}>
          <img className="poster"
              src={movie.poster}
              alt=""
          />
          <h4 className="card-title">
              {movie.name}<span> -  {movie.year}</span>
          </h4>

      </Col></>
  )
}


export default function Movies({show}) {

  const [movies, setMovies] = useState();
  // use async to wait that response comes from backend and this part ruuning then the other part of projct start running


  const loadData = async () => {
    //access front to backend
    const result = await axios.get("http://localhost:8080/api/movie/read.php")
    //first read data from axios, second in backound we have array of movie, to read field of data from back, we write second .data
    setMovies(result.data.data);
    console.log(movies);
  }
 const [search, setSearch] = useState();
 const handleSearch = async () => {
    const searchResult = await axios.get(
      `http://localhost:8080/api/movie/search.php?searchQuery=${search}`
    );
    setMovies(searchResult.data.data);
    console.log(searchResult.data);
  };
  useEffect(() => {
    if (!movies) loadData();
  }, []);

  return (<div className="container"> 
     <Form className="d-flex " style={{position: "relative", left:"15%" ,width: "70%" , height: "40px"}}>
          <FormControl
            type="search"
            placeholder="Search movie by name or year"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Button variant="outline-secondary" onClick={handleSearch}>
            SEARCH
          </Button>
        </Form>
    {
                movies &&
                movies.map((m) => {
                    return (
                        <MovieCard show={show} movie={m} />
                    );
                })}


  </div>);

}