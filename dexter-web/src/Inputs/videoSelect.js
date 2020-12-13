
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import VideoThumbnail from 'react-video-thumbnail';
import { Player } from 'video-react';

import VideoUpload from './videoUpload';

import videoA from '../DemoFiles/A.mp4';
import videoB from '../DemoFiles/B.mp4';
import videoC from '../DemoFiles/C.mp4';
import videoD from '../DemoFiles/D.mp4';

const videos = [videoA, videoB, videoC, videoD];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(30),
            height: theme.spacing(30),
        },
        // maxWidth: 345,
        // maxHeight: 345,
    },
    media: {
        height: 140,
    },
}));

export default function VideoSelect(props) {
    const classes = useStyles();

    const handleSelect = (videoUrl) => {
        props.setSelectedVideo(videoUrl);
        props.setDisableNext(false);
    }

    const videoCards = videos.map((videoUrl, i) => {
        return (
            <Card container>
                <CardActionArea>
                    {/* <VideoThumbnail
                        videoUrl={videoUrl}
                        width={120}
                        height={80}
                    /> */}
                    {/* <CardMedia
                        className={classes.media}
                        image={videoUrl}
                        title="Contemplative Reptile"
                    /> */}
                    <Player>
                        <source src={videoUrl} />
                    </Player>
                    <CardContent>
                        {/* <Typography gutterBottom variant="h5" component="h2">
                            {videoUrl}
                        </Typography> */}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {videoUrl}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" onClick={(e) => handleSelect(videoUrl)}>
                        Select
                    </Button>
                </CardActions>
            </Card>


        );
    });

    return (
        <div>
            <h1>Select a Video</h1>
            <div className={classes.root}>
                {videoCards}
            </div>
            {/* <Button onClick={handleSelect(videoA)}> select </Button> */}
            <VideoUpload />
        </div>
    );
}