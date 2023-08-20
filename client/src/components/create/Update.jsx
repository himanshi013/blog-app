import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)`
  margin: 50px 100px;
`;
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  min-height: 40px;
  background-color: #dee3e0;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;
const TitleArea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 10px;
  background-color: #f4f8f8;
  border: none;
  border-radius: 5px;
  padding: 0px 20px;
  font-size: 24px;
`;
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const updateBlogPost = async () => {
    post.title = post.title === "" ? "Not available" : post.title;
    post.description = post.description === "" ? ("No Description" || "No") : post.description;
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/details/${id}`);
    }
  };

  const handleChange = (e) => {
    // if(e.target.value === "")
    //   e.target.value = "No title";
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <Container>
      <Image src={url} alt="banner" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          placeholder="Title"
          value={post.title}
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button onClick={() => updateBlogPost()} variant="contained">
          Update
        </Button>
      </StyledFormControl>
      <TextArea
        rowsMin={10}
        placeholder="Tell your story..."
        name="description"
        onChange={(e) => handleChange(e)}
        value={post.description}
      />
    </Container> */}

      <Card style={{ padding: "20px"}} className="mb-4">
        <CardActionArea>
          <CardMedia component="img" image={url} alt="Old Image" />
          <CardContent>
            <div className="d-flex">
              <label htmlFor="fileInput">
                <Add fontSize="large" color="action" />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <TitleArea
                className="text-center title"
                placeholder="Title"
                minRows={1}
                maxRows={2}
                value={post.title}
                onChange={(e) => handleChange(e)}
                name="title"
              />

              <Box style={{ float: "right" }}>
                <Button
                  onClick={() => updateBlogPost()}
                  variant="contained"
                  className="ml-2"
                >
                  Update
                </Button>
              </Box>
            </div>
            <TextArea
              // rowsMin={10}
              maxRows={3}
              placeholder="Tell your story..."
              name="description"
              onChange={(e) => handleChange(e)}
              value={post.description}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default Update;
