import {
  Button,
  Card,
  Box,
  CardHeader,
  CardActions,
  styled
} from '@mui/material';
import { i18nextAbout } from "@transitionpt/translations";

const ImgWrapper = styled('img')(
  ({ theme }) => `
      height: ${theme.spacing(18)};
      position: absolute;
      right: ${theme.spacing(3)};
      top: 50%;
      margin-top: -${theme.spacing(9)};
`
);

function FullReport() {
  const { t } = i18nextAbout;

  return (
    <Card
      sx={{
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        p: 3,
        position: 'relative'
      }}
    >
      <Box>
        <CardHeader
          sx={{
            p: 0
          }}
          title={t('Want full report?')}
          subheader={t('Get it today by clicking the button below.')}
          subheaderTypographyProps={{ variant: 'body1' }}
          titleTypographyProps={{ variant: 'h3', gutterBottom: true }}
        ></CardHeader>
        <ImgWrapper src="/admin/static/images/placeholders/illustrations/5.svg" />
        <CardActions
          sx={{
            px: 0,
            pb: 0,
            pt: 3
          }}
        >
          <Button variant="outlined">{t('Download now')}</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default FullReport;
