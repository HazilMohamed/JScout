import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Home Page Here!!!</p>
      <Link to="/match">Go to match analysis</Link>
    </div>
  );
};

export default Home;
