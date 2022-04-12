import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import DetailsPageHeader from '../../../../components/PageHeaders/DetailsPageHeader';
import CreateForm from './CreateForm';
import DetailForm from './DetailForm';

import { Box, 
  Grid,
  Card, 
  useTheme,
  Alert
} from '@mui/material';

import { useRefMounted } from '../../../../hooks/useRefMounted';

import { GetAssociationData } from '../../../../services/associations';

import { i18nextAssociationDetails } from "@transitionpt/translations";

function AssociationDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [association, setAssociation] = useState(null);
    const [associationError, setAssociationError] = useState(null);
    useErrorHandler(associationError);
    const { t } = i18nextAssociationDetails;
    const associationsListUri = "/management/associations";
    let associationUri = "/associations/get/" + router.query.associationId;
    let associationPutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/associations/create" : "/associations/update");

    const getAssociationData = useCallback(async () => {
        try {
            let associationData = await GetAssociationData(process.env.NEXT_PUBLIC_API_BASE_URL + associationUri);
            console.log(associationData)
            if (isMountedRef()) {
              if (associationData.status) {
                setAssociationError(associationData);
                setAssociation({});
              }
              else {
                setAssociation(associationData.associationData);
              }
            }
          } catch (err) {
            setAssociationError(err);
            console.error(err);
          }
    }, [isMountedRef, associationUri]);

    useEffect(() => {
      if (!isCreate) {
        getAssociationData();
      }
    }, [isCreate,getAssociationData]);

    if (!isCreate && !association) {
      return null;
    }

    console.log(associationUri)

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.management'), isLink: false },
      { url: associationsListUri, label: t('LIST.associationsTitle'), isLink: true },
      { url: "", label: isCreate ? t('LABELS.associationCreateSmall') : association.name, ownPage: true },
    ];

    return (
    <>
      {association ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.associationCreate') : association.name} goBackLabel={t('LABELS.goBack')} goBackUrl={associationsListUri}/>
        </PageTitleWrapper>
        ) : (<></>)
      }

      <Box sx={{ mt: 3 }}>
        <Grid
          sx={{ px: 4 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          { isCreate &&
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      <Box p={4} flex={1}>
                        <Alert severity="info">
                            {t('LABELS.registerAssociationInfo')}
                        </Alert>
                        <Box
                          pt={3}
                          pb={1}
                          sx={{
                            px: { xs: 0, md: 3 }
                          }}
                        >
                            <CreateForm associationPutUrl={associationPutUri}/>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
          }
          { !isCreate &&
              <DetailForm associationData={association} associationPutUrl={associationPutUri}/>
          }
        </Grid>
      </Box>
    </>
    );
}

export default AssociationDetails;
