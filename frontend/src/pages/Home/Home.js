import "./Home.css";
import backroundImg from "../../img/backroundImg.jpg";
import Navbar from "../../components/Navbar/Navbar";


const Home = () => {
  return (
    <>
    <Navbar />
    <div className="container-home" >
  

      <h1 className="title-home">Welcome to JobBoard !</h1>

      <div className="image-container">
        <img className="background-image" src={backroundImg} alt="none" />
      </div>
    </div>
    </>
  );
};

export default Home;
