import { Google } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

function Login() {
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
          alert('Button clicked');
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
}

export default Login;
