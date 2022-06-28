import { 
    Grid
} from '@mui/material';

import MainTab from './MainTab';

const CreateForm = ({bannerPutUri, parentBannerId, parentBannerPath}) => {

    return (
        <Grid direction="row" container justifyContent="center">
            <Grid item xs={12}>
                <MainTab isCreate={true} bannerPutUri={bannerPutUri} bannerData={{}} parentBannerId={parentBannerId} parentBannerPath={parentBannerPath}/>
            </Grid>
        </Grid>
    );
}

export default CreateForm;