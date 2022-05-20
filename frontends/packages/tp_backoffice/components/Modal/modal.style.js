import { styled } from '@mui/material/styles';

export const DarkBg = styled('div')(
  ({ theme }) => `
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    z-index: 1900;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
`
);

export const Centered = styled('div')(
  ({ theme }) => `
    position: fixed;
    z-index: 2000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
);