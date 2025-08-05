import { Button, styled, TextField } from "@mui/material";

export const OpenModalButton = styled(Button)(() => ({
    backgroundColor: 'white',
    '&:active': {
        boxShadow: 'none',
        outline: 'none',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(106, 141, 179, 0.5)',
        outline: 'none',

    },
    '&:hover': {
        outline: 'none',
    },
}))

export const AddButton = styled(Button)(() => ({
    width: 100,
    marginTop: 5,
    backgroundColor: '#87CEFA',
    color: 'white',
    textTransform: 'none',
    '&:active': {
        boxShadow: 'none',
        outline: 'none',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        outline: 'none',

    },
    '&:hover': {
        outline: 'none',
    },
    '&.Mui-disabled': {
        backgroundColor: '#D3D3D3',
        opacity: 0.4,
        color: '#eee',
        cursor: 'not-allowed',
    },
}))

export const IPList = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: 15,
    flexGrow: 1,
    gap: 10
}))

export const IPListItem = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 10,
}))

export const CounterIcon = styled('div')(() => ({
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 15
}))

export const IpInput = styled(TextField)(() => ({
    width: '60%',
    '& input': {
        height: '30',
        padding: '10px 14px',
    },
}))

export const ModalContainer = styled('div')(() => ({
    width: 500,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
}))