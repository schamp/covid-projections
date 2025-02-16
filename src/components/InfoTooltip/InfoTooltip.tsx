import React, { useState } from 'react';
import { InfoIcon, StyledTooltip, StyledCloseIcon } from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';
import VisuallyHiddenDiv from 'components/VisuallyHidden/VisuallyHidden';
import { useBreakpoint } from 'common/hooks';
import { tooltipAnchorOnClick } from 'components/InfoTooltip';
import { v4 as uuidv4 } from 'uuid';

const InfoTooltip: React.FC<StyledTooltipProps> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoint(600);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      props.trackOpenTooltip();
    }
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const idForAccessability = uuidv4();

  return (
    <>
      <StyledTooltip
        onOpen={handleOpen}
        onClose={handleClose}
        title={
          <>
            <StyledCloseIcon role="button" onClick={handleClose} />
            {props.title}
          </>
        }
        open={isOpen}
        leaveTouchDelay={60000} // for mobile: long leaveTouchDelay makes the tooltip stay open until close-icon is clicked
        aria-describedby={idForAccessability}
      >
        <InfoIcon
          $isOpen={isOpen}
          tabIndex={0}
          role="button"
          onClick={() => tooltipAnchorOnClick(isMobile, handleOpen)}
        />
      </StyledTooltip>
      <VisuallyHiddenDiv content={props.title} elemId={idForAccessability} />
    </>
  );
};

export default InfoTooltip;
