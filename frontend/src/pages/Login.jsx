import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Form from "../components/Form"
import NavBarGeneral from "../components/NavBarGeneral"

function Login() {
    return (
    <div>
        <NavBarGeneral />
        <Form route="/api/token/" method="login" />
        <Faq />
        <Footer />
    </div>
    );
}

export default Login