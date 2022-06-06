import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';

export default function HelperTooltip({tooltipText, tooltipAriaLabel}) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={tooltipText}
        >
          <IconButton
            aria-label={tooltipAriaLabel}
            color="inherit"
            size="medium"
            onClick={handleTooltipOpen}
          >
            <HelpTwoToneIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
    </ClickAwayListener>
  );
}
