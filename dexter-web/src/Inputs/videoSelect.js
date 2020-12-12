
import Button from '@material-ui/core/Button';

import VideoUpload from './videoUpload';

export default function VideoSelect(props) {

    const handleSelect = () => {

        props.setDisableNext(false)
    }

    return (
        <div>
            <h1>Video Select</h1>
            <Button onClick={handleSelect}> select </Button>
            <VideoUpload />
        </div>
    );
}