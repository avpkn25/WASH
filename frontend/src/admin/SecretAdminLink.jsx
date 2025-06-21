import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SecretAdminLink() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      // Press Ctrl + Alt + P to redirect
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'p') {
        navigate('/adminlogin');  // Redirect to AdminLogin
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  return null; // No visible link needed
}

export default SecretAdminLink;
