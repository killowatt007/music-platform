import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {GetServerSideProps} from "next";
import { Grid } from '@mui/material';
import axios from "axios";
import CommentsTrack from '../../components/CommentsTrack';
import Back from '../../components/Back';

interface Props {
  serverTrack: ITrack;
}

const TrackPage: React.FC<Props> = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)

    return (
      <MainLayout>
        <Back link="/tracks" />
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