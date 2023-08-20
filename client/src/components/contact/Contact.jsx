
import { Box, styled, Typography, Link, CardMedia } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const Heading = styled(Typography)`
    font-size: 30px;
`


const url = "http://mrtaba.ir/image/bg2.jpg";

const Contact = () => {
    return (
        <Box>
            {/* <Banner /> */}
            <CardMedia className='bann'
                component="img"
                image={url}
            />
            <Wrapper>
                <Heading variant="h3">Getting in touch is easy!</Heading>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/nikhil_saxena._/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:nikhilsaxena738@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;