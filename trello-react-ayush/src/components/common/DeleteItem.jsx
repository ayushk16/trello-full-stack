import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteItem = ({ deleteFunction, deleteFunctionParams, itemName }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        sx={{ justifySelf: 'flex-end', height: 'fit-content' }}
        variant="contained"
        size="small"
        color="error"
        onClick={handleClickOpen}
      >
        <DeleteIcon style={{ alignSelf: 'flex-end', fontSize: '1.5rem' }} />
        <Typography variant="body2" marginLeft={1}>
          DELETE
        </Typography>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete {itemName}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            are sure you want to delete {itemName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteFunction(deleteFunctionParams);
              handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteItem;
