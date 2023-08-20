import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
//components
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin:"10px",
  },
}));

const Image = styled("img")`
  width: 100%;
  objectfit: cover;
  height: 50vh;
  border-radius: 2%;
`;
const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
// `;
const Description = styled(Typography)`
  word-break: break-word;
`;
const EditIcon = styled(Edit)`
  margin: 5x;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const DeleteIcon = styled(Delete)`
  margin: 5x;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
// `;
const Author = styled(Box)`
  color: #878787;
  margin: 20px 0;
  display: flex;
`;

const dp = "https://static.thenounproject.com/png/12017-200.png";

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

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

  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 200, marginTop: 10 }} className="text-center ">
        <CardActionArea>
          <CardMedia
            component="img"
            // height="80%"
            image={url}
            alt="green iguana"
          />
          <CardContent>
            <Box style={{ float: "right" }}>
              {account.username === post.username && (
                <>
                  <Link to={`/update/${post._id}`}>
                    <button class="btn btn-primary btns" type="submit">
                      Edit
                    </button>
                    {/* <EditIcon color="primary" className="btn btn-primary"/> */}
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteBlog()}
                    className="btn btn-danger btns"
                  >
                    Delete
                  </button>
                </>
              )}
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              <Heading>{post.title}</Heading>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {/* <div className="auth"> */}

              <Author>
                {/* <div className="dp">
                  <img src={dp} alt="dp" />
                </div> */}
                <Typography>
                  Author:
                  <Box component="span" style={{ fontWeight: 600 }}>
                    {post.username}
                  </Box>
                </Typography>
                {/* <Typography>{new Date(post.createdDate).toDateString()}</Typography> */}
              </Author>

              {/* </div> */}
            </Typography>
            <Typography className="mt-4">
              <Description className="descrip">{post.description}</Description>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Container>
        {/* <div className="postColor">
          <Image src={url} alt="blog" />
          <Box style={{ float: "right" }}>
            {account.username === post.username && (
              <>
                <Link to={`/update/${post._id}`}>
                  <button class="btn btn-primary btns" type="submit">
                    Edit
                  </button>
                   <EditIcon color="primary" className="btn btn-primary"/>
                </Link>
                <button
                  type="button"
                  onClick={() => deleteBlog()}
                  className="btn btn-danger btns"
                >
                  Delete
                </button>
              </>
            )}
          </Box>
          <Heading>{post.title}</Heading>
          <div className="auth">
            <Author>
              <Typography>
                Author:
                <Box component="span" style={{ fontWeight: 600 }}>
                  {post.username}
                </Box>
              </Typography>
               <Typography>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description className="descrip">{post.description}</Description>
          </div>
        </div>  */}
        <Comments post={post} />
      </Container>
    </>
  );
};
export default DetailView;
