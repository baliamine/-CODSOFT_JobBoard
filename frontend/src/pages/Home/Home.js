import "./Home.css";
import backroundImg from "../../img/backroundImg.jpg";

const Home = () => {
  return (
    <div>
      <h1 className="title-home">Welcome to JobBoard !</h1>

      <div className="image-container">
        <img className="background-image" src={backroundImg} alt="none" />
      </div>
    </div>
  );
};

export default Home;
