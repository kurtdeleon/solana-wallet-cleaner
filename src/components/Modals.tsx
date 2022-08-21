import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { Typography, styled } from "@mui/material";
import { FAQ_LIST } from "../utils/";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const InitialWarningDialog: FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      keepMounted={false}
      onClose={handleClose}
      aria-describedby="warning-dialog"
    >
      <DialogTitle>{"Use with caution"}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="warning-dialog-description">
          <p>
            This website has not been fully tested yet and the API used by this
            service is still in beta. Please be advised that the owner will not
            be liable for any accidents that may happen.
          </p>
          <p>Only use burner wallets which don't contain any valuable NFTs.</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            localStorage.setItem("solanaWalletCleanerDialog", "true");
            handleClose();
          }}
        >
          Don't show again
        </Button>
        <Button onClick={handleClose}>I understand</Button>
      </DialogActions>
    </Dialog>
  );
};

const Answer = styled("div")({
  fontSize: "14px",
  marginBottom: "24px",
});

export const FAQDialog: FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="faq-dialog"
    >
      <DialogTitle>{"Frequently Asked Questions"}</DialogTitle>
      <DialogContent dividers={true}>
        {FAQ_LIST.map((faq) => (
          <>
            <Typography
              variant="h4"
              fontSize="16px"
              fontWeight="bold"
              marginBottom="8px"
            >
              {faq.question}
            </Typography>
            <Answer dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
