import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Paper, Stack, Box, Typography, Skeleton } from '@mui/material';
import { AiOutlineEdit } from 'react-icons/ai';

import CardDetails from '../Cards/CardDetails';
import AddItem from '../common/AddItem';

import { fetchCards, addCard } from '../../features/lists/listCardsSlice';

const ListCards = ({ listId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [modalCardId, setModalCardId] = React.useState(null);

  const addNewCard = ({ listId, value }) => {
    dispatch(addCard({ listId, value }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalCardId(null);
    setOpen(false);
  };

  const listCards = useSelector((state) => {
    if (state && state.listCards.data && state.listCards.data[listId]) {
      return state.listCards.data[listId];
    }
  });
  return (
    <>
      {listCards &&
        listCards.map((card) => {
          return (
            <Paper elevation={4} key={card.id} className="list-card">
              <Box
                height={40}
                alignContent="center"
                onClick={() => {
                  setModalCardId(card.id);
                  handleOpen();
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  padding={1}
                >
                  <Typography variant="body1">{card.name}</Typography>
                  <Typography variant="body1">
                    <AiOutlineEdit />
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          );
        })}
      <AddItem
        addFunction={addNewCard}
        addFunctionParams={{ listId }}
        itemName={'Card'}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <CardDetails
          listId={listId}
          cardId={modalCardId}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      </Modal>
    </>
  );
};

export default ListCards;
