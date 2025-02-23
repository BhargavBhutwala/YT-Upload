import { Google } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useAuth } from '../helper/AuthContext';

function Login() {
  const navigate = useNavigate();

  const { token, loginUser } = useAuth();

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/youtube.upload',
    onSuccess: (response) => {
      console.log(response);
      loginUser(response.access_token);
      navigate('/upload');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Login failed');
    },
  });

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<Google></Google>}
        onClick={() => {
          login();
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
}

export default Login;
