import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dropzone: {
      minHeight: 100
    },
  });

export default function VideoUpload() {
    const classes = useStyles();

    return (
        <div>
            <h1>Upload a Video</h1>
            <DropzoneArea classes={{
                root: classes.dropzone
            }}/>
        </div>
    );
}