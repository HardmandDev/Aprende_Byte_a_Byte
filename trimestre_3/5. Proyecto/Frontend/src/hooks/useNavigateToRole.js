import { useNavigate } from 'react-router-dom';

const useNavigateToRole = () => {
  const navigate = useNavigate();

  const navigateToRole = (roleId) => {
    switch (roleId) {
      case '8c890948-5402-40e6-a38d-6f2df9e3b4db':
        navigate('/student');
        break;
      case 'f3d9324c-ecbd-4d1b-bc92-dbe75ff149db':
        navigate('/teacher');
        break;
      case '7bf4770d-ab11-4aba-9e0a-991b3f162488':
        navigate('/admin');
        break;
      case '6126917f-f7e3-4ee8-a5a1-16e3b128f26b':
        navigate('/support');
        break;
      default:
        navigate('/profile');
    }
  };

  return navigateToRole;
};

export default useNavigateToRole;
