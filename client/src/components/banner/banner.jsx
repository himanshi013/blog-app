import { Box, CardMedia, Typography, styled } from "@mui/material";

// const Image = styled(Box)`
//   background: url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg")
//     center/55% repeat-x #000;
//   width: 100%;
//   height: 50vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   border-radius: 10px;
// `;
const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
`;
const SubHeading = styled(Typography)`
  font-size: 20px;
  color: #ffffff;
`;

const url = "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg";

const Banner = () => {
  return (
    // <Image>
      <CardMedia className="bann"
        component='img'
        image={url}>
      {/* <Heading>BLOG</Heading>
      <SubHeading>My Blog</SubHeading> */}
      
        </CardMedia>
    // </Image>
  );
};
export default Banner;
