import { CloudUpload, Publish, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

function Upload() {
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          marginTop: 5,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={'bold'}>
          Upload Here
        </Typography>
        <Typography gutterBottom>
          Please upload your video file in MP4 format with a maximum size of
          50MB
        </Typography>

        <Box
          component="form"
          display={'flex'}
          flexDirection={'column'}
          marginTop={3}
          gap={3}
        >
          <TextField label="Video Title" variant="outlined" />
          <TextField
            label="Video Description"
            variant="outlined"
            multiline
            rows={5}
          />
          <input
            type="file"
            id="video-upload"
            accept="video/"
            style={{ display: 'none' }}
          />
          <label htmlFor="video-upload">
            <Button
              variant="contained"
              component="span"
              color="secondary"
              startIcon={<CloudUpload />}
            >
              Select files
            </Button>
          </label>
          <FormControl fullWidth>
            <InputLabel id="video-visibility">Visibility</InputLabel>
            <Select
              label="video-visibility"
              startAdornment={
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              }
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="unlisted">Unlisted</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<Publish />}
          >
            Upload Video
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Upload;
