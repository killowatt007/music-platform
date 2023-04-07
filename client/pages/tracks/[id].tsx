import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import { Button, Grid } from '@mui/material';
import axios from "axios";
import CommentsTrack from '../../components/CommentsTrack';

interface Props {
  serverTrack: ITrack;
}

const TrackPage: React.FC<Props> = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()

    return (
      <MainLayout>
        <Button
          variant={"outlined"}
          onClick={() => router.push('/tracks')}
        >
          К списку
        </Button>
        <Grid container style={{margin: '20px 0'}}>
          <img 
            src={'http://localhost:5000/' + track.picture}
            width={200}
            height={200}
          />
          <div style={{marginLeft: 30}}>
            <h3>Название трека - {track.name}</h3>
            <h3>Исполнитель - {track.artist}</h3>
            <h3>Прослушиваний - {track.listens}</h3>
          </div>
        </Grid>
        <h2>Слова в треке</h2>
        <p>{track.text}</p>
        <CommentsTrack
          track={track}
          setTrack={setTrack}
        />
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