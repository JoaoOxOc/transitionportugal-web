import { useState, useRef, useCallback, useEffect } from 'react';
import { 
    Grid, 
    InputLabel,
    Switch,
    Card,
    styled
} from '@mui/material';

import { i18nextBannerDetails } from "@transitionpt/translations";
import MainTab from './MainTab';
import RelatedList from './RelatedList';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

// other editor JS plugins: https://github.com/orgs/editor-js/repositories
const DetailForm = ({isCreate, bannerData, parentBannerId, parentBannerPath, bannerPutUri }) => {
    const { t } = i18nextBannerDetails;
    const [currentTab, setCurrentTab] = useState('main');

    const tabs = [
        { value: 'main', label: t('TABS.main') },
        { value: 'related', label: t('TABS.relatedBanners') }
    ];
  
    const handleTabsChange = (_event, value) => {
        setCurrentTab(value);
    };

    return (
      <Grid direction="row" container justifyContent="center">
          <Grid item xs={12}>
              <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              >
              {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
              </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
              {currentTab === 'main' && <MainTab isCreate={isCreate} bannerPutUri={bannerPutUri} bannerData={bannerData} parentBannerId={parentBannerId} parentBannerPath={parentBannerPath}/>}
              {currentTab === 'related' && <RelatedList bannerData={bannerData}/>}
          </Grid>
      </Grid>
  );
    
}
   
export default DetailForm