import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import axios from "../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; 
import Container from "@mui/material/Container";


export const FullPost = () => {
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.warn(e);
        alert("Ошибка при получении статьи");
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.warn(e);
        alert("Ошибка при получении комментариев");
      });
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/posts/${id}/comments`, { text: commentText })
      .then((response) => {
        handleAddComment(response.data);
        setCommentText("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        key={data._id}
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={{
          avatarUrl: data.user?.avatarUrl,
          fullName: data.user?.fullName,
        }}
        createdAt={data.updatedAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <Box mt={3}>
        <Paper component="form" onSubmit={handleCommentSubmit}>
          <TextField
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            fullWidth
            style={{fontSize : '201px'}}
          />
          <Button type="submit" variant="contained" color="primary">
            Отправить
          </Button>
        </Paper>
      </Box>
      <Box mt={2}>
        <List component={Paper}>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="bold">
                    {comment.user.fullName}
                  </Typography>
                }
                secondary={comment.text}                
              />
            </ListItem>
          ))}
        </List>
      </Box>
    

    </>
  );
};
