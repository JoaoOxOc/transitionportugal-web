import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import DetailsPageHeader from '../../../../components/PageHeaders/DetailsPageHeader';
import EmailEditorComponent from './emailEditor';
import DetailForm from './DetailForm';

import { Box, 
  Grid, 
  Card, 
  useTheme,
  Alert
} from '@mui/material';

import { useRefMounted } from '../../../../hooks/useRefMounted';

import { GetEmailTemplateData } from '../../../../services/emailTemplates';

import { i18nextEmailTemplateDetails } from "@transitionpt/translations";

function EmailTemplateDetails({isCreate, isEditor}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [emailTemplate, setEmailTemplate] = useState(null);
    const [emailTemplateError, setEmailTemplateError] = useState(null);
    useErrorHandler(emailTemplateError);
    const { t } = i18nextEmailTemplateDetails;
    let emailTemplatesListTitle = t('LIST.emailTemplatesTitle');
    const emailTemplatesListUri = "/management/settings/emailTemplate";
    let emailTemplateGetUri = "/emailTemplates/get/" + router.query.templateId;
    let emailTemplatePutUri = process.env.NEXT_PUBLIC_API_BASE_URL + "/emailTemplates/edit";

    const getTemplateData = useCallback(async () => {
        try {
            let templateData = await GetEmailTemplateData(process.env.NEXT_PUBLIC_API_BASE_URL + emailTemplateGetUri);
            if (isMountedRef()) {
              if (templateData.status) {
                setEmailTemplateError(templateData);
                setEmailTemplate({});
              }
              else {
                setEmailTemplate(templateData.template);
              }
            }
          } catch (err) {
            setEmailTemplateError(err);
            console.error(err);
          }
    }, [isMountedRef, emailTemplateGetUri]);

    useEffect(() => {
      getTemplateData();
    }, [getTemplateData]);

    if (!emailTemplate) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.settings'), isLink: false },
      { url: emailTemplatesListUri, label: emailTemplatesListTitle, isLink: true },
      { url: "", label: emailTemplate.key, ownPage: true },
    ];

    return (
      <>
      { isEditor == true ? (
        <>
          {emailTemplate &&
              <EmailEditorComponent templateData={emailTemplate} templatePutUrl={emailTemplatePutUri}/>
          }
        </>
      ) : (
          <>
          {emailTemplate ?
            (
            <PageTitleWrapper>
              <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={emailTemplate.description} goBackLabel={t('LABELS.goBack')} goBackUrl={emailTemplatesListUri}/>
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
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      <Box p={4} flex={1}>
                          <Alert severity="warning">
                            {t('LABELS.emailTemplateWarning')}
                          </Alert>
                        <Box
                          pt={3}
                          pb={1}
                          sx={{
                            px: { xs: 0, md: 3 }
                          }}
                        >
                          {emailTemplate &&
                            <DetailForm templateData={emailTemplate} templatePutUrl={emailTemplatePutUri}/>
                          }
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      )
    }
    </>
    );
}

export default EmailTemplateDetails;
