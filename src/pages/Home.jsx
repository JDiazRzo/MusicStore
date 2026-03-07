import Body from "../components/Body/Body";
import Hero from "../components/Hero/Hero";
import NavbarGlass from "../components/Navbar/NavbarGlass";

function Home(){
    return(
        <div>
            <NavbarGlass/>
            <Hero/> 
            <Body/>
        </div>
    )
}

export default Home