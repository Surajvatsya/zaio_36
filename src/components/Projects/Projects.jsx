import netflix from "assets/svg/netflix.svg";
import instagram from "assets/svg/instagram.svg";
import tinder from "assets/svg/tinder.svg";
import meta from "assets/svg/meta.svg";
import amazon from "assets/svg/amazon.svg";
import g_keep from "assets/svg/g_keep.svg";
import youtube from "assets/svg/youtube.svg";
import Button from "components/Button/Button";
import "./Projects.css";


export default function Projects(){
    return (
        <section className="projects_build my-5">
        <div className="container">
            <div className="inner">
                <div className="heading_area text-center mb-5 text-center">
                    <h3 className="mb-3">What projects will you build?</h3>
                    <p className="w-md-65 mx-auto">Through out your learning path, you will be building real world apps that will be added to your porfolio of projects. Start showing off your portfolio as soon as you get certified.</p>
                </div>

                <ul className="justify-content-center list-unstyled row align-items-center">
                    <li className="mx-4">
                        <img src={netflix} alt="Netflix" />
                    </li>
                    <li  className="mx-4">
                        <img src={instagram} alt="Insta" />
                    </li>
                    <li  className="mx-4">
                        <img src={tinder} alt="Tinder" />
                    </li>
                    <li  className="mx-4">
                        <img src={meta} alt="Meta" />
                    </li>
                    <li className="mx-4">
                        <img src={amazon} alt="AWS" />
                    </li>
                    <li  className="mx-4">
                        <img src={g_keep} alt="Google Keep" />
                    </li>
                    <li  className="mx-4">
                        <img src={youtube} alt="Youtube" />
                    </li>
                </ul>

            <div className="text-center mt-5">
                <Button link="/getstarted">
                    Get started
                </Button>
            </div>
            
            </div>
        </div>
    </section>);
}