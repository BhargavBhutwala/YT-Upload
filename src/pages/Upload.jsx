import { CloudUpload, Publish, Visibility } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
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
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../helper/AuthContext';

function Upload() {
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('');
  const [video, setVideo] = useState('');

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);

  // for three values
  function changeValue(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'visibility') {
      setVisibility(value);
    }
  }

  // for uploading video
  function handleVideoChange(event) {
    setVideo(event.target.files[0]);
  }

  async function submitForm() {
    //  console.log(video);
    try {
      setLoading(true);

      // send form data to server

      const url = 'http://localhost:8080/api/youtube/video/upload';

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('visibility', visibility);
      formData.append('videoFile', video);

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Video uploaded successfully');
      } else {
        setMessage('Error uploading video');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error uploading video');
    } finally {
      setLoading(false);
    }
  }

  async function generateVideoMetadata() {
    if (title.trim() == '') {
      toast.error('Video Title required!');
      return;
    }

    const metadataUrl =
      'http://localhost:8080/api/youtube/video/generate-metadata';

    try {
      const formData = new FormData();
      formData.append('title', title);

      const response = await axios.post(metadataUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setTags(response.data.tags);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxWidth="md">
      {message && (
        <Alert
          variant="filled"
          severity={
            message === 'Video uploaded successfully' ? 'success' : 'error'
          }
          sx={{
            marginTop: 3,
            color: 'white',
          }}
        >
          {message}
        </Alert>
      )}
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
          <TextField
            name="title"
            value={title}
            onChange={changeValue}
            label="Video Title"
            variant="outlined"
          />
          <TextField
            name="description"
            value={description}
            onChange={changeValue}
            label="Video Description"
            variant="outlined"
            multiline
            rows={5}
          />
          <input
            type="file"
            onChange={handleVideoChange}
            id="video-upload"
            accept="video/"
            style={{ display: 'none' }}
          />
          <label htmlFor="video-upload">
            <Box display={'flex'} flexDirection={'row'} gap={2}>
              <Button
                variant="contained"
                component="span"
                color="secondary"
                startIcon={<CloudUpload />}
                sx={{ width: 200 }} // Set button width to 200px
              >
                Select file
              </Button>
              <TextField
                value={video?.name || ''}
                variant="outlined"
                disabled={!video} // Disable the TextField if no file is selected
                sx={{ flexGrow: 1 }} // This makes the TextField take up the remaining space
              />
            </Box>
          </label>
          <FormControl fullWidth>
            <InputLabel id="video-visibility">Visibility</InputLabel>
            <Select
              name="visibility"
              onChange={changeValue}
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

          {tags.length > 0 && (
            <Box
              flex
              flexDirection={'column'}
              sx={{ textAlign: 'left' }}
              marginTop={1}
            >
              <Typography variant="h6" gutterBottom>
                Video Tags
              </Typography>
              <Box marginTop={1}>
                {tags.map((item, index) => (
                  <Chip
                    variant="filled"
                    color="default"
                    label={item}
                    key={index}
                    sx={{ margin: 0.5 }}
                    onDelete={() => {}}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box alignItems={'center'}>
            <Button
              onClick={generateVideoMetadata}
              variant="contained"
              size="large"
              color="info"
            >
              Generate Metadata
            </Button>
            <Button
              variant="contained"
              loading={loading}
              loadingPosition="start"
              disabled={loading}
              onClick={submitForm}
              size="large"
              color="primary"
              startIcon={<Publish />}
              sx={{ width: 200, marginLeft: 2 }}
            >
              {loading ? 'Uploading' : 'Upload'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Upload;
