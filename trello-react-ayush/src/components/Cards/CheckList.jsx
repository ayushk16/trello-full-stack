import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Stack,
  Box,
  Paper,
  Skeleton,
  FormGroup,
  Card,
  CardContent,
} from '@mui/material';
import { FiCheckSquare } from 'react-icons/fi';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import CheckItem from './CheckItem';
import DeleteItem from '../common/DeleteItem';
import AddItem from '../common/AddItem';

import {
  deleteCheckList,
  addCheckItem,
} from '../../features/checkLists/checkListsSlice';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const CheckList = ({ checkListId, checkListName, cardId, checkItemsArray }) => {
  const dispatch = useDispatch();

  const deleteACheckList = ({ checkListId }) => {
    dispatch(deleteCheckList(checkListId));
  };

  const addACheckItem = ({ checkListId, value }) => {
    dispatch(addCheckItem({ checkListId, value }));
  };

  let numberOfCheckedItems = 0;
  let totalNumberOfItems = 0;

  let checkedItems = 0;
  checkItemsArray.forEach((item) => {
    if (item.state === 'complete') {
      checkedItems++;
    }
  });
  numberOfCheckedItems = checkedItems;

  totalNumberOfItems = checkItemsArray.length;

  return (
    <>
      <Card sx={{ marginY: '50px', backgroundColor: ' #F6FDC3' }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            md={{ display: 'flex', justifyContent: 'space-between' }}
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
            marginTop={3}
          >
            <Stack spacing={2} direction="column">
              <Stack spacing={2} direction="row">
                <Typography variant="h6" component="h2">
                  <FiCheckSquare />
                </Typography>
                <div id={checkListId}>
                  <Typography variant="h6" component="h2">
                    {checkListName}
                  </Typography>
                </div>
              </Stack>
              <DeleteItem
                deleteFunction={deleteACheckList}
                deleteFunctionParams={{ checkListId }}
                itemName={checkListName}
              />
              <Stack direction="column">
                {numberOfCheckedItems > 0 && (
                  <BorderLinearProgress
                    variant="determinate"
                    value={(numberOfCheckedItems / totalNumberOfItems) * 100}
                  />
                )}
                <FormGroup>
                  {checkItemsArray &&
                    checkItemsArray.map((item) => {
                      return (
                        <>
                          <CheckItem
                            key={item.id}
                            itemName={item.name}
                            itemState={item.state}
                            cardId={cardId}
                            checkListId={checkListId}
                            checkItemId={item.id}
                          />
                        </>
                      );
                    })}
                </FormGroup>
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                  <AddItem
                    addFunction={addACheckItem}
                    addFunctionParams={{
                      checkListId,
                    }}
                    itemName={'CheckItem'}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CheckList;
