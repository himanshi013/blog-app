import React, { useState, useContext } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Component = styled(Box)`
  // background-color: #f2f7f4;
  width: 330px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
  flexwrap: wrap;
`;
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "20px 0 0",
  // borderRadius: "50%",
});
const Wrapper = styled(Box)`
  padding: 10px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 10px;
  & > div,
  & > button,
  & > p {
    margin-top: 15px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb6418;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  margin-bottom: 20px;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

// const Bkg = styled(Box)`
//   background-size: cover;
//   min-height: 100vh;
//   min-width: 100%;
//   margin-top: 0px;
// `

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;
const loginInitialValue = {
  username: "",
  password: "",
};
const signupInitialValue = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  //   const imageURL =
  // "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  isUserAuthenticated(false);
  const [account, toggleaccount] = useState("Login");
  const [signup, setSignup] = useState(signupInitialValue);
  const [login, setLogin] = useState(loginInitialValue);
  const [error, setError] = useState("");
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const togglesignup = () => {
    setError("");
    account === "signup" ? toggleaccount("Login") : toggleaccount("signup");
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    if (signup.name !== "" && signup.username !== "" && signup.password !== "") {
      let response = await API.userSignup(signup);
      console.log(response);
      if (response.isSuccess) {
        setError("");
        setSignup(signupInitialValue);
        toggleaccount("Login");
      } else {
        toast.success("Fill out required field", {
          position: "top-center"})
        setError("something went wrong");
      }
    } 
    else {
      setError("Fill out required field");
    }
  };

  const loginUser = async () => {

    if (login.username !== "" && login.password !== "") {
      let response = await API.userLogin(login);
    //  console.log("SDFDS->   ",response.json());
    

      if (response.isSuccess) {
        // setError("");
        toast.success("User login successfully", {
          position: "top-center"})
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({
          username: response.data.username,
          name: response.data.name,
        });
        isUserAuthenticated(true);
        navigate("/");
      }
      if(response.msg === "username not match"){
        toast.success("User is not registered", {
          position: "top-center"})
        setError("invalid credentials");
      }
      
    }
    else {
      // toast.success("Fill out required field", {
      //   position: "top-center"})
      setError("Fill out required field");
    }
  };

  return (
    // <div style={{backgroundImage:"url(/background.jpeg)"}} className="bkg">
    <Component>
      <Box>
        <Image className="logo" src="/download.jpg" alt="Login" />
        {account === "Login" ? (
          <Wrapper>

            <TextField              
              //   variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
              required
            />

            <TextField
              required
              //   variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => togglesignup()}>
              Create an Acount
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              required
              value={signup.name}
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              required
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter UserName"
            />
            <TextField
              required
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Paaword"
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton onClick={() => togglesignup()}>
              Alreay have an Acount
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
    // </div>
  );
};
export default Login;
