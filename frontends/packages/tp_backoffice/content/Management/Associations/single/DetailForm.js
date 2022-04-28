import { useState } from 'react';
import { 
    Grid, 
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    Tabs,
    Tab,
    FormControlLabel,
    FormHelperText,
    CircularProgress,
    styled
} from '@mui/material';

import { i18nextAssociationDetails } from "@transitionpt/translations";

import MainTab from './MainTab';
import AddressTab from './AddressTab';
import UsersTab from './UsersTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const DetailForm = ({associationData, associationPutUrl}) => {
    const { t } = i18nextAssociationDetails;
    const [currentTab, setCurrentTab] = useState('main');

    const tabs = [
        { value: 'main', label: t('TABS.main') },
        { value: 'address', label: t('TABS.address') },
        { value: 'users', label: t('TABS.users') }
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
                {currentTab === 'main' && <MainTab associationPutUrl={associationPutUrl} associationData={associationData}/>}
                {currentTab === 'address' && <AddressTab associationPutUrl={associationPutUrl} associationData={associationData}/>}
                {currentTab === 'users' && <UsersTab associationId={associationData.id}/>}
            </Grid>
        </Grid>
    );
}

export default DetailForm;