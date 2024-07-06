import Form from "../components/Form"
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import NavBarGeneral from "../components/NavBarGeneral"


function Register() {
    return (
    <div>
        <NavBarGeneral />
        <Form route="/api/users/register/" method="register" />
        <Faq />
        <Footer />
    </div>
        );
}

export default Register