
import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import NavBar from "../components/NavBar";
import HowItWorks from "../components/HowItWorks";
import Welcome from "../components/Welcome";
import ListTopics from "../components/ListTopics";
import Statistics from "../components/Statistics";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import Cta from "../components/Cta";
import Faq from "../components/Faq";
import Pricing from "../components/Pricing";
import Skills from "../components/Skills";

function Home() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    return (
        <div>
            <NavBar />
            <Welcome />
            <ListTopics />
            <HowItWorks />
            <AboutUs />
            <Skills />
            <Cta />
            <Faq />
            <Pricing />
            <Reviews />
            <Statistics />
            <Footer />
        </div>
    );
}

export default Home;
