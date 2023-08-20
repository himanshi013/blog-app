import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
const Component = styled(AppBar)`
  background: #ffffff;
  grid-template-columns: 1fr 1fr;
  color: #000;
  display: grid;
  // margin: 5px;
`;
const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 15px;
    color: #000;
    text-decoration: none;
  }
`;
const Image = styled("img")({
  width: "50px",
//   alignContent: center
});
const Header = () => {
  return (
    <Component>
      <Image className="brand_img"
        // src="/download.jpg"
        // className=" justify-content-left mt-2 ml-5"
      />
      <Container >
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/Login"> LOGOUT</Link>
      </Container>
    </Component>
  );
};
export default Header;
