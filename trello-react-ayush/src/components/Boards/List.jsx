import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { archiveList } from '../../features/lists/listsSlice';

import { fetchCards } from '../../features/lists/listCardsSlice';

import { Box, Stack, Card, CardContent, Typography } from '@mui/material';
import { BiArchiveIn } from 'react-icons/bi';

import ListCards from './ListCards';

const List = ({ listId, listName }) => {
  const dispatch = useDispatch();

  const archiveAList = (listId) => {
    dispatch(archiveList(listId));
  };

  useEffect(() => {
    dispatch(fetchCards({ listId }));
  }, []);

  return (
    <>
      <Box width="auto" minWidth={300} maxWidth={500}>
        <Card
          sx={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="h2" variant="h6" marginBottom={2}>
                {listName}
              </Typography>
              <Typography component="h2" variant="h6" marginBottom={2}>
                <BiArchiveIn
                  onClick={() => {
                    archiveAList(listId);
                  }}
                />
              </Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
              <ListCards listId={listId} />
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default List;
