import React from "react";
import { useEffect, useState } from "react";
import { Grid, Paper, Container } from "@mui/material";
import NoteCard from "../components/NoteCard";
import { Masonry } from "@mui/lab";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    //endpoint provided by json-server
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  async function handleDelete(id) {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  }

  return (
    <Container>
      <Masonry columns={{ xs: 1, md: 3 }} spacing={2}>
        {notes.map((note) => {
          return (
            <NoteCard
              key={note.title}
              note={note}
              handleDelete={handleDelete}
            />
          );
        })}
      </Masonry>
    </Container>
  );
}
