import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box
            onClick={() => {
              navigate('/boards');
            }}
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              left: '20px',
            }}
          >
            <Typography variant="h5" noWrap component="div">
              <AiOutlineHome className="home-icon" />
            </Typography>
          </Box>
          <div className="trelloLogo"></div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
