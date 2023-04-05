import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import { Button, Grid, TextField } from '@mui/material';
import axios from "axios";
import {useInput} from "../../hooks/useInput";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
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
      <MainLayout>
        <Button
          variant={"outlined"}
          onClick={() => router.push('/tracks')}
        >
          К списку
        </Button>
        <Grid container style={{margin: '20px 0'}}>
          <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
          <div style={{marginLeft: 30}}>
            <h3>Название трека - {track.name}</h3>
            <h3>Исполнитель - {track.artist}</h3>
            <h3>Прослушиваний - {track.listens}</h3>
          </div>
        </Grid>
        <h2>Слова в треке</h2>
        <p>{track.text}</p>
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
      </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}