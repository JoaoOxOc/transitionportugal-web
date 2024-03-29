import {
  Box,
  Tooltip,
  Badge,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import Image from 'next/image';
import Link from '../Link';
import { i18nextAbout } from "@transitionpt/translations";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 252px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 252px;
        height: 100%;
        margin-top: 4px;
        transform: scale(.8);
`
);

const LogoSign = styled(Box)(
  ({ theme }) => `
        background: ${theme.general.reactFrameworkColor};
        width: 18px;
        height: 18px;
        border-radius: ${theme.general.borderRadiusSm};
        position: relative;
        transform: rotate(45deg);
        top: 3px;
        left: 17px;

        &:after, 
        &:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: -1px;
            right: -20px;
            transform: rotate(0deg);
            border-radius: ${theme.general.borderRadiusSm};
        }

        &:before {
            background: ${theme.palette.primary.main};
            right: auto;
            left: 0;
            top: 20px;
        }

        &:after {
            background: ${theme.palette.secondary.main};
        }
`
);

const LogoSignInner = styled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${theme.general.borderRadiusSm};
        background: ${theme.header.background};
`
);

const TooltipWrapper = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  const { t } = i18nextAbout;
  const theme = useTheme();

  return (
    // <TooltipWrapper title={'Tokyo Next.js Javascript Admin Dashboard'} arrow>
    //   <LogoWrapper href="/admin">
    //     <Badge
    //       sx={{
    //         '.MuiBadge-badge': {
    //           fontSize: theme.typography.pxToRem(11),
    //           right: -2,
    //           top: 8
    //         }
    //       }}
    //       overlap="circular"
    //       color="success"
    //       badgeContent="3.0"
    //     >
    //       <LogoSignWrapper>
    //         <LogoSign>
    //           <LogoSignInner />
    //         </LogoSign>
    //       </LogoSignWrapper>
    //     </Badge>
    //   </LogoWrapper>
    // </TooltipWrapper>
    <LogoWrapper href={process.env.NEXT_PUBLIC_HOME_URL}>
      <LogoSignWrapper>
        <Image src='/admin/static/images/logo/logotipo_transicaoportugal.svg' width="250px" height="100%" sx={{margin: '0 auto'}} alt="Transição Portugal"/>
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
