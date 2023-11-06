import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoards, addBoard } from '../../features/boards/boardsSlice';
import {
  styled,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
} from '@mui/material';

import BoardTile from './BoardTile';
import AddItem from '../common/AddItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BoardsContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  const boardsData = useSelector((state) => {
    return state.boards;
  });

  const addBoardFunction = ({ value }) => {
    dispatch(addBoard(value));
  };

  if (boardsData.loading) {
    return (
      <Container>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={3}
        >
          {(boardsData.loading ? Array.from(new Array(3)) : data).map(
            (item, index) => (
              <Box sx={{ width: 300 }} key={index}>
                <Skeleton width={250} />
                <Skeleton
                  variant="rectangular"
                  height={300}
                  width={250}
                  animation="wave"
                />
                <Skeleton width={250} animation={false} />
              </Box>
            )
          )}
        </Grid>
      </Container>
    );
  }

  if (boardsData.error !== '' && boardsData.error === 'Something went wrong ') {
    return (
      <Container>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={3}
        >
          <Grid item xs={12}>
            <Item>
              <Typography variant="h3" component="h1">
                Can't load try again later.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh Page!
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (
    boardsData.error !== '' &&
    boardsData.error === 'Something went while adding board try again.'
  ) {
    return (
      <Container>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={3}
        >
          <Grid item xs={12}>
            <Item>
              <Typography variant="h3" component="h1">
                You reached the limit of boards, please delete some boards to
                add new one.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh Page!
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={3}
          >
            {boardsData.data.map((item) => {
              return <BoardTile key={item.id} tile={item} />;
            })}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              display={'flex'}
              alignItems={'center'}
              height={300}
            >
              <AddItem
                addFunction={addBoardFunction}
                addFunctionParams={{}}
                itemName={'Board'}
              />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};

export default BoardsContainer;
