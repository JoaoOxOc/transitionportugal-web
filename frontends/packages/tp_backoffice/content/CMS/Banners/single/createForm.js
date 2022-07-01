import { useState, useRef, useCallback, useEffect } from 'react';
import { 
    Grid
} from '@mui/material';
import { useErrorHandler } from 'react-error-boundary';
import { useSession } from "next-auth/react";
import { useRefMounted } from '../../../../hooks/useRefMounted';
import { GetBannerData } from '../../../../services/cms/banners';

import MainTab from './MainTab';

const CreateForm = ({bannerData, bannerPutUri, parentBannerId, parentBannerPath}) => {
    console.log(bannerData, parentBannerPath)
    bannerData = bannerData ? {
        pageKey: bannerData.pageKey,
        componentKey: bannerData.componentKey,
        orderPosition: bannerData.childElements
    } : {};

    return (
        <Grid direction="row" container justifyContent="center">
            <Grid item xs={12}>
                <MainTab isCreate={true} bannerPutUri={bannerPutUri} bannerData={bannerData} parentBannerId={parentBannerId} parentBannerPath={parentBannerPath}/>
            </Grid>
        </Grid>
    );
}

export default CreateForm;