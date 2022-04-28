import React, { useRef, useState } from 'react';

import { Box, 
    Grid, 
    Card, 
    useTheme,
    Button,
    Slide,
    Alert
  } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useErrorHandler } from 'react-error-boundary';

import EmailEditor from '../../../../components/EmailEditor';
import { useRefMounted } from '../../../../hooks/useRefMounted';
import { UpdateEmailTemplateData } from '../../../../services/emailTemplates';
import { i18nextEmailTemplateDetails } from "@transitionpt/translations";
import sample from './sample.json';

const EmailEditorComponent = (props) => {
    console.log(props)
    const { t } = i18nextEmailTemplateDetails;
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();
    const emailEditorRef = useRef(null);
    const [editorIsLoaded, setEditorLoaded] = useState(false);
    const [templateError, setTemplateError] = useState(null);
    useErrorHandler(templateError);

  const submitToServer = async(designJson, htmlData) => {
    try {
        const templateModel = {
            id: props.templateData.id,
            key: props.templateData.key,
            language: props.templateData.language,
            bodyHtml: htmlData,
            templateDataJson: designJson
        }
        console.log(templateModel);
        const result = await UpdateEmailTemplateData(props.templatePutUrl, templateModel);

        if (isMountedRef()) {
            if (result.status) {
              if (result.status === 404) {
                  enqueueSnackbar(t('MESSAGES.templateNotFound', {templateKey: props.templateData.key}), {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    autoHideDuration: 2000,
                    TransitionComponent: Slide
                  });
              }
              setTemplateError(result);
            }
            else {
              enqueueSnackbar(t('MESSAGES.templateUpdatedSuccessfully', {templateKey: props.templateData.key}), {
                  variant: 'success',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  autoHideDuration: 2000,
                  TransitionComponent: Slide
              });
            }
        }
    } catch (err) {
        console.error(err);

        if (isMountedRef()) {
          enqueueSnackbar(t('MESSAGES.templateGeneralError', {templateKey: props.templateData.key}), {
              variant: 'error',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
              },
              autoHideDuration: 2000,
              TransitionComponent: Slide
          });
          setTemplateError(err);
        }
    }
  }

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
        console.log('saveDesign', design);
        alert('Output JSON has been logged in your developer console.');
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      submitToServer(design, html);
    });
  };

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = () => {
    console.log('onLoad');

    emailEditorRef.current.editor.addEventListener(
      'design:loaded',
      onDesignLoad
    );

    emailEditorRef.current.editor.loadDesign(props.templateData.templateDataJson);
  }

  const onReady = () => {
    console.log('onReady');
    setEditorLoaded(true);
  };

  return (
    <>

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </React.StrictMode>
      { editorIsLoaded == true &&
    //   <Grid direction="column" container justifyContent="center">
            <Box
                sx={{
                    maxWidth: '300px !important',
                    margin: '0 auto'
                }}
            >
                <Button
                    sx={{
                        mt: 3
                    }}
                    color="primary"
                    onClick={exportHtml}
                    fullWidth
                    size="large"
                    variant="contained"
                    >
                    {t('FORM.saveButton')}
                </Button>
            </Box>
      }
    </>
  );
};

export default EmailEditorComponent;
