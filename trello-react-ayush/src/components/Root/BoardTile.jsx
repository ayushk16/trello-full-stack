import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, styled, Paper, Box, Skeleton } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  width: 'auto',
  height: 300,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'primary.dark',
  backgroundPosition: 'center',
  borderRadius: '10px',
  '&:hover': {
    opacity: [0.9, 0.8, 0.7],
  },
};

const BoardTile = ({ tile: boardTile }) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        onClick={() => navigate(`/boards/${boardTile.id}`)}
        marginTop={2}
      >
        <Box
          sx={
            !boardTile.prefs
              ? { ...style }
              : !boardTile.prefs.backgroundImage
              ? !boardTile.prefs.backgroundColor
                ? { ...style, backgroundColor: 'primary.dark' }
                : {
                    ...style,
                    backgroundColor: boardTile.prefs.backgroundColor,
                  }
              : {
                  ...style,
                  backgroundImage: `url(${boardTile.prefs.backgroundImage})`,
                }
          }
        >
          <Item>
            <Typography variant="h6" component="h2">
              {boardTile.name}
            </Typography>
          </Item>
        </Box>
      </Grid>
    </>
  );
};

export default BoardTile;
