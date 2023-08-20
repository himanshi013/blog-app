import { useState, useContext, useEffect } from "react";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";
import axios from "axios";

const Container = styled(Box)`
  margin-top: 50px;
  display: flex;
`;
const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  margin: 10,
});
const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
  padding: 5px;
  border-radius: 5px;
`;

const initialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

export const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [comment, setComment] = useState(initialValues);
  const [comments, setcomments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { account } = useContext(DataContext);
  useEffect(() => {
    try {
      const getData = async () => {
        // const response = await axios.get(`/comments/${post._id}`);
        const response = await API.getAllComments();
        if (response?.isSuccess) {
          const result = response.data.filter(
            (item) => item.postId === post._id
          );
          setcomments(result);
          // setcomments(response?.data);
        }
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [post, toggle]);
  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };
  const addComment = async (e) => {
    if (comment.comments !== "") {
      let response = await API.newComment(comment);
      if (response.isSuccess) {
        setComment(initialValues);
      }
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea
          minRows={2}
          maxRows={2}
          placeholder="what's on your mind?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          className="postBtn"
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>

      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};
export default Comments;
