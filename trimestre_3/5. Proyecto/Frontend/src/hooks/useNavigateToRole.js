import { useNavigate } from 'react-router-dom';

const useNavigateToRole = () => {
  const navigate = useNavigate();

  const navigateToRole = (roleId) => {
    switch (roleId) {
      case 'student':
        navigate('/student');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'support':
        navigate('/support');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/auth/login');
    }
  };

  return navigateToRole;
};

export default useNavigateToRole;
