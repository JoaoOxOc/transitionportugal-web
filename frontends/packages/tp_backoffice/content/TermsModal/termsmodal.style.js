import { styled } from '@mui/material/styles';

export const TermsModalContainer = styled('div')(
    ({ theme }) => `
        width: 80vw;
        min-height: 80vh;
        background-color: white;
        color: white;
        z-index: 10;
        border-radius: 16px;
        box-shadow: 0 5px 20px 0 rgba(0; 0; 0; 0.04);
  `
  );

export const TermsModalHeader = styled('div')(
    ({ theme }) => `
    height: 50px;
    background-color: white;
    overflow: hidden;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  `
  );

export const TermsModalHeading = styled('h5')(
    ({ theme }) => `
        margin: 0;
        padding: 10px;
        color: #2c3e50;
        font-weight: 500;
        font-size: 18px;
        text-align: center;
  `
  );

export const TermsModalContent = styled('div')(
    ({ theme }) => `
        padding: 10px;
        font-size: 14px;
        color: #2c3e50;
        text-align: center;
  `
  );

export const TermsModalActions = styled('div')(
    ({ theme }) => `
        position: absolute;
        bottom: 2px;
        margin-bottom: 10px;
        width: 100%;
  `
  );

export const TermsModalActionsContainer = styled('div')(
    ({ theme }) => `
        display: flex;
        justify-content: space-around;
        align-items: center;
  `
  );

  export const TermsModalCloseBtn = styled('button')(
    ({ theme }) => `
        cursor: pointer;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 8px;
        border: none;
        font-size: 18px;
        color: #2c3e50;
        background-color: white;
        transition: all 0.25s ease;
        box-shadow: 0 5px 20px 0 rgba(0; 0; 0; 0.06);
        position: absolute;
        right: 0;
        top: 0;
        align-self: flex-end;
        margin-top: -7px;
        margin-right: -7px;
        &::hover {
            box-shadow: 0 5px 20px 0 rgba(0; 0; 0; 0.04);
            transform: translate(-4px; 4px);
        }
  `
  );

  export const TermsModalConfirmBtn = styled('button')(
    ({ theme }) => `
            margin-top: 10px;
            cursor: pointer;
            font-weight: 500;
            padding: 11px 28px;
            border-radius: 12px;
            font-size: 0.8rem;
            border: none;
            color: #fff;
            background-color: #ff3e4e;
            transition: all 0.25s ease;
            &::hover {
                box-shadow: 0 10px 20px -10px rgba(255; 62; 78; 0.6);
                transform: translateY(-5px);
                background-color: #ff3e4e;
            }
  `
  );

  export const TermsModalCancelBtn = styled('button')(
    ({ theme }) => `
            margin-top: 10px;
            cursor: pointer;
            font-weight: 500;
            padding: 11px 28px;
            border-radius: 12px;
            font-size: 0.8rem;
            border: none;
            color: #2c3e50;
            background-color: #fcfcfc;
            transition: all 0.25s ease;
            &::hover {
                box-shadow: none;
                transform: none;
                background-color: whitesmoke;
            }
  `
  );