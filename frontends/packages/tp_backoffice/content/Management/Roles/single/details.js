import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import DetailsPageHeader from '../../../../components/PageHeaders/DetailsPageHeader';
import DetailForm from './DetailForm';

import { Box, 
  Grid, 
  Card, 
  useTheme,
  Alert
} from '@mui/material';

import { useRefMounted } from '../../../../hooks/useRefMounted';
import { useSession } from "next-auth/react";
import { GetRoleData } from '../../../../services/roles';

import { i18nextRoleDetails } from "@transitionpt/translations";

function RoleDetails({isCreate}) {
    const router = useRouter();
    const isMountedRef = useRefMounted();
    const theme = useTheme();
    const [role, setRole] = useState(null);
    const [roleError, setRoleError] = useState(null);
    useErrorHandler(roleError);
    const { data: session, status } = useSession();
    const { t } = i18nextRoleDetails;
    const rolesListUri = "/management/profiles";
    let roleUri = "/roles/get/" + router.query.roleId;
    let rolePutUri = process.env.NEXT_PUBLIC_API_BASE_URL + (isCreate ? "/roles/create" : "/roles/update");

    const getRoleData = useCallback(async () => {
        try {
            let roleData = await GetRoleData(process.env.NEXT_PUBLIC_API_BASE_URL + roleUri, session.accessToken);
            if (isMountedRef()) {
              if (roleData.status) {
                setRoleError(roleData);
                setRole({});
              }
              else {
                setRole(roleData.role);
              }
            }
          } catch (err) {
            setRoleError(err);
            console.error(err);
          }
    }, [isMountedRef, roleUri]);

    useEffect(() => {
      if (!isCreate) {
        getRoleData();
      }
    }, [isCreate,getRoleData]);

    if (!isCreate && !role) {
      return null;
    }

    const breadcrumbsData = [
      { url: "/", label: t('LIST.home'), isLink: true },
      { url: "", label: t('LIST.management'), isLink: false },
      { url: rolesListUri, label: t('LIST.rolesTitle'), isLink: true },
      { url: "", label: isCreate ? t('LABELS.roleCreateSmall') : role.roleName, ownPage: true },
    ];

    return (
    <>
      {(isCreate || role) ?
        (
        <PageTitleWrapper>
          <DetailsPageHeader breadcrumbsDataJson={breadcrumbsData} detailsTitle={isCreate ? t('LABELS.roleCreate') : role.roleName} goBackLabel={t('LABELS.goBack')} goBackUrl={rolesListUri}/>
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
                    { !isCreate ?
                      <Alert severity="warning">
                          {t('LABELS.roleWarning')}
                      </Alert>
                    : 
                      <Alert severity="info">
                          {t('LABELS.registerRoleInfo')}
                      </Alert>
                    } 
                    <Box
                      pt={3}
                      pb={1}
                      sx={{
                        px: { xs: 0, md: 3 }
                      }}
                    >
                    {(isCreate || role) &&
                        <DetailForm isCreate={isCreate} roleData={role} rolePutUrl={rolePutUri}/>
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
    );
}

export default RoleDetails;
