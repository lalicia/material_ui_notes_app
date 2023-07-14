import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//make a hook containing classes with css
const useStyles = makeStyles({
  field: {
    display: "block",
    "&&": {
      marginTop: "1.25rem",
      marginBottom: "1.25rem",
    },
  },
});

export default function Create() {
  //invoke the styles hook
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    //so they reset every time you click the button
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }

    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => navigate("/"));
    }
  }

  return (
    <Container>
      <Typography
        variant="h6" //styled like h6
        component="h2" //outputs h2 (view in the console)
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      {/* No special form tag for MUI */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError} //do we have a value for title? error will provide a MUI style and use the colors
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          minRows={4}
          fullWidth
          required
          error={detailsError} //do we have a value for details? error will provide a MUI style and use the colors
        />

        <FormControl
          className={classes.field}
          sx={{ display: "flex", direction: "column" }}
        >
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="money"
              control={<Radio color="secondary" />}
              label="Money"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="secondary" />}
              label="Todo"
            />
            <FormControlLabel
              value="reminders"
              control={<Radio color="secondary" />}
              label="Reminders"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="secondary" />}
              label="Work"
            />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
