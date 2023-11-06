import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchBoard } from '../../features/boards/boardSlice';
import {
  fetchLists,
  addList,
  archiveList,
} from '../../features/lists/listsSlice';

import {
  styled,
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  Skeleton,
  Button,
  Card,
  CardContent,
  Paper,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import List from './List';
import AddItem from '../common/AddItem';

const style = {
  marginTop: '-50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '50px 100px',
  backgroundColor: 'transparent',
  width: '100vw',
  minHeight: '100vh',
};

const BoardView = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, []);

  const boardView = useSelector((state) => {
    return state.board.data;
  });

  const setBoard = 'as';
  useEffect(() => {
    dispatch(fetchLists(id));
  }, []);

  const boardLists = useSelector((state) => {
    return state.lists;
  });

  const addNewList = ({ boardId, value }) => {
    dispatch(addList({ boardId, value }));
  };

  const archieveAList = ({ listId }) => {
    dispatch(archiveList(listId));
  };

  const navigate = useNavigate();

  if (boardLists.loading) {
    return (
      <>
        <Container>
          <Stack
            spacing={2}
            display="flex"
            direction="row"
            flexWrap="wrap"
            marginY={4}
          >
            <Stack
              marginTop={3}
              gap={5}
              direction={'row'}
              overflow="scroll"
              height={'80vh'}
            >
              <Box width="auto" minWidth={300} maxWidth={500} minHeight={400}>
                <Card
                  sx={{
                    height: '400px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <CardContent>
                    <Skeleton height={50}></Skeleton>
                    <Skeleton height={300}></Skeleton>
                  </CardContent>
                </Card>
              </Box>
              <Box width="auto" minWidth={300} maxWidth={500} minHeight={400}>
                <Card
                  sx={{
                    height: '400px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <CardContent>
                    <Skeleton height={50}></Skeleton>
                    <Skeleton height={300}></Skeleton>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </>
    );
  }

  if (boardLists.error) {
    return (
      <>
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
                  An error occured, please try again later.
                </Typography>
                <Box height={50}></Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate('/boards');
                  }}
                >
                  Go to Home Page!
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <div
          style={
            !boardView.prefs
              ? { ...style }
              : !boardView.prefs.backgroundImage
              ? !boardView.prefs.backgroundColor
                ? { ...style, backgroundColor: 'transparent' }
                : {
                    ...style,
                    backgroundColor: boardView.prefs.backgroundColor,
                  }
              : {
                  ...style,
                  backgroundImage: `url(${boardView.prefs.backgroundImage})`,
                }
          }
        >
          <Stack
            spacing={2}
            display="flex"
            direction="row"
            flexWrap="wrap"
            marginY={4}
          >
            <Stack
              marginTop={3}
              gap={5}
              direction={'row'}
              overflow="scroll"
              height={'80vh'}
            >
              {boardLists.data.map((list) => {
                return (
                  <List key={list.id} listId={list.id} listName={list.name} />
                );
              })}

              <Box width="auto" minWidth={300} maxWidth={500} paddingX={4}>
                <AddItem
                  addFunction={addNewList}
                  addFunctionParams={{ boardId: id }}
                  itemName={'List'}
                />
              </Box>
            </Stack>
          </Stack>
        </div>
      </>
    );
  }
};

export default BoardView;
