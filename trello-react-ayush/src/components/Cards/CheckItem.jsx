import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Skeleton,
} from '@mui/material';

import DeleteItem from '../common/DeleteItem';

import {
  updateCheckItem,
  deleteCheckItem,
} from '../../features/checkLists/checkListsSlice';

const CheckItem = ({
  itemName,
  itemState,
  cardId,
  checkListId,
  checkItemId,
}) => {
  const dispatch = useDispatch();

  const [checkedStatus, setCheckedStatus] = useState(true);

  useEffect(() => {
    itemState && setCheckedStatus(itemState === 'complete' ? true : false);
  }, []);

  const updateACheckItem = ({
    cardId,
    checkListId,
    checkItemId,
    checkedStatus,
  }) => {
    dispatch(
      updateCheckItem({ cardId, checkListId, checkItemId, checkedStatus })
    );
  };

  const deleteACheckItem = ({ checkListId, checkItemId }) => {
    // console.log({ checkListId, checkItemId });
    dispatch(deleteCheckItem({ checkListId, checkItemId }));
  };

  const handleCheck = (isCheck) => {
    if (isCheck) {
      updateACheckItem({
        cardId,
        checkListId,
        checkItemId,
        checkedStatus: isCheck,
      });
    } else {
      updateACheckItem({
        cardId,
        checkListId,
        checkItemId,
        checkedStatus: isCheck,
      });
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(e) => {
            setCheckedStatus(e.target.checked);
            handleCheck(e.target.checked);
          }}
          checked={checkedStatus}
        />
      }
      label={
        <div
          style={{
            width: '400px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            component="h3"
            {...(checkedStatus
              ? { style: { textDecoration: 'line-through' } }
              : {})}
          >
            {itemName}
          </Typography>
          <DeleteItem
            deleteFunction={deleteACheckItem}
            deleteFunctionParams={{
              checkListId,
              checkItemId,
            }}
            itemName={itemName}
          />
        </div>
      }
    />
  );
};

export default CheckItem;
