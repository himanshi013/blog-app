

import { Grid } from "@mui/material";
import Banner from "../banner/banner";
import Categories from "./Categories";
import Posts from "./Post/Posts";



const Home = () => {
  return (
    <>
    <div style={{margin:10}}>
      <Banner />
      {/* <Grid container className="postDiv">
        <Grid item lg={2} sm={2} xs={12}>
          <div className="category">
          
          </div>
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
        
        </Grid>
      </Grid>
       */}
      <div className="row mx-auto">
        <div className="col-md-3"><Categories /></div>
        <div className="col-md-9 mx-auto"> <Posts/></div>
      </div>
      </div>
    </>
  );

}
export default Home;