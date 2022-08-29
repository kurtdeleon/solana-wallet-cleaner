import { FC, useState } from "react";
import { Typography, styled } from "@mui/material";
import { CHANGELOG, FAQ_LIST, TODO_LIST } from "../../utils";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "../TabPanel";

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

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const FaqChangelog: FC<Props> = ({ open, handleClose }) => {
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
                    key={Buffer.from(change, "base64").toString()}
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
