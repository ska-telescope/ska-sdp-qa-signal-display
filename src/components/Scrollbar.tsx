import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import type { ScrollBarProps as PerfectScrollbarProps } from 'react-perfect-scrollbar';
import { Box } from '@material-ui/core';

type ScrollbarProps = PerfectScrollbarProps

const fun = (props, ref) => {
    const { children, ...other } = props;
  
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
    if (isMobile) {
      return (
        <Box
          ref={ref}
          sx={{ overflowX: 'auto' }}
        >
          {children}
        </Box>
      );
    }
  
    return (
      <PerfectScrollbar
        ref={ref}
        {...other}
      >
        {children}
      </PerfectScrollbar>
    );
  }
  
const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(fun);

Scrollbar.propTypes = {
  children: PropTypes.node
};

export default Scrollbar;
