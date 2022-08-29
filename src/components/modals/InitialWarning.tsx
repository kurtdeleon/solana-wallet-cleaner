import { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const InitialWarning: FC<Props> = ({ open, handleClose }) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [neverShow, setNeverShow] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      keepMounted={false}
      onClose={handleClose}
      aria-describedby="warning-dialog"
    >
      <DialogTitle>{"Use with caution"}</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom="12px">
          This website has not been fully tested yet and the API used by this
          service is still in beta. Please be advised that the owner will not be
          liable for any accidents that may happen.
        </DialogContentText>
        <DialogContentText>
          Only use burner wallets which don't contain any valuable NFTs.
        </DialogContentText>
        <FormGroup sx={{ marginTop: "16px" }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ paddingY: "4px" }}
                size="small"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
              />
            }
            label="I understand the risks"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ paddingY: "8px" }}
                size="small"
                checked={neverShow}
                onChange={(event) => setNeverShow(event.target.checked)}
              />
            }
            label="Never show again"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!confirmed}
          onClick={() => {
            if (neverShow) {
              localStorage.setItem("solanaWalletCleanerDialog", "true");
            }
            handleClose();
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
