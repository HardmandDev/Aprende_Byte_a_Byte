import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Go to Profile</button>
    </div>
  );
}

export default Home;