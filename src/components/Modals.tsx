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
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography, styled } from "@mui/material";
import { CHANGELOG, FAQ_LIST, TODO_LIST } from "../utils/";
import { TabPanel } from "./TabPanel";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const InitialWarningDialog: FC<Props> = ({ open, handleClose }) => {
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
                sx={{ paddingY: "4px" }}
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

const Answer = styled("div")({
  fontSize: "14px",
  marginBottom: "24px",
});

const ListItem = styled("li")({
  fontSize: "14px",
  marginBottom: "4px",
});

const List = styled("ul")({
  paddingLeft: "16px",
});

export const FAQDialog: FC<Props> = ({ open, handleClose }) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="faq-dialog"
      fullWidth
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="more infp tabs"
        variant="fullWidth"
      >
        <Tab label="FAQs" />
        <Tab label="Changelog" />
      </Tabs>
      <DialogContent>
        <TabPanel id={0} hidden={tab !== 0}>
          {FAQ_LIST.map((faq, index) => (
            <div key={`faq-${index}`}>
              <Typography
                variant="h4"
                fontSize="16px"
                fontWeight="bold"
                marginBottom="8px"
              >
                {faq.question}
              </Typography>
              <Answer dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </TabPanel>
        <TabPanel id={1} hidden={tab !== 1}>
          <Typography
            variant="h3"
            fontSize="20px"
            fontWeight="bold"
            marginBottom="8px"
          >
            Changelog
          </Typography>
          {CHANGELOG.map((log, index) => (
            <div key={`changelog-${index}`}>
              <Typography
                variant="h4"
                fontSize="16px"
                fontWeight="bold"
                marginTop="16px"
                marginBottom="8px"
              >
                {log.date}
              </Typography>
              <List>
                {log.changes.map((change) => (
                  <ListItem
                    key={change.substring(0, 10)}
                    dangerouslySetInnerHTML={{ __html: change }}
                  />
                ))}
              </List>
            </div>
          ))}
          <Typography
            variant="h3"
            fontSize="20px"
            fontWeight="bold"
            marginTop="24px"
            marginBottom="8px"
          >
            Ideas for Future Features
          </Typography>
          <List>
            {TODO_LIST.map((todo, index) => (
              <ListItem
                key={`todo-${index}`}
                dangerouslySetInnerHTML={{ __html: todo }}
              />
            ))}
          </List>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
