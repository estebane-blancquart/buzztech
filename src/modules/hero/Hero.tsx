import Button from "../../components/button/Button";
import Grid from "../../components/grid/Grid";
import './hero.module.scss';


const Hero = () => {
  return (
    <>
      <Grid mobile={"one-col-mobile"} tablet={"one-col-tablet"} desktop={"two-col-desktop"}>
      <h2>BuzzTech, des solutions rapides et personnalisées pour vos besoins informatiques.</h2>        
        <img
        className="sphere"
        src="images/sphere.gif"
        alt="Animation décorative d'une sphère"
      />
      <Button />
      <p>⬐ A propos des solutions.</p>
      </Grid>
    </>


  );
};

export default Hero;
