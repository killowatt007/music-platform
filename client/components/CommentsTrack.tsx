import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useInput } from '../hooks/useInput';
import axios from 'axios';
import { ITrack } from '../types/track';

interface Props {
  track: ITrack;
  setTrack: Function;
}

const CommentsTrack: React.FC<Props> = ({track, setTrack}) => {
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h2>Комментарии</h2>
      <Grid container>
        <TextField
          label="Ваше имя"
          fullWidth
          style={{marginBottom: '20px'}}
          {...username}
        />
        <TextField
          label="Комментарий"
          {...text}
          fullWidth
          multiline
          style={{marginBottom: '20px'}}
          rows={4}
        />
        <Button variant="contained" onClick={addComment}>Отправить</Button>
      </Grid>
      <div className="comments">
        {track.comments.map(comment =>
          <div className="item">
            <div className="name">{comment.username}</div>
            <div className="text">{comment.text}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentsTrack;