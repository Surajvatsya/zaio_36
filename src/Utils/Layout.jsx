import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function Layout({children}) {
    const {user} = useContext(UserContext);
    return (
        <>
            <Navbar loggedin={!!user} username={user?user.username:''}></Navbar>
                <div style={{minHeight:'50vh'}}>
                {children}
                </div>
            <Footer/>
        </>
    )
}
