import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography, Avatar } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { red, green, purple, orange, blue } from "@mui/material/colors";

function NoteCard({ note, handleDelete }) {
  //{category} is the destructured property we're looking at here - as in note/category - I believe is how this works!
  const getAvatarBgColor = ({ category }) =>
    ({
      work: red[500],
      money: green[500],
      todos: purple[300],
      reminders: orange[500],
    }[category] || blue[500]);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: getAvatarBgColor(note) }}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
