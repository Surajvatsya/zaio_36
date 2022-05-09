import cert from "assets/img/landingpage/certificate-img.jpg";
import certback from "assets/img/landingpage/certback.png";
import "./Certificates.css"

export default function Certificates(){
    return (
        <section style={{backgroundColor: '#f7f1ec'}} className="certificate_main position-relative">
            <div className="bg-dark-sm position-absolute w-100 h-100" style={{
                backgroundImage: "url(" + certback + ")",
                top:0,
                left:0,
                backgroundPosition: '0 0',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
            </div>
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-md-6">
                        <img src={cert} alt="Zaio Certificate" className="img-fluid"/>
                    </div>
                    <div className="col-md-6">
                        <div className="w-md-85">
                            <h2 className="text-center mb-4"><b>Certification</b></h2>
                            <p>On completing the Full stack web development path, you will receive a Certificate of Completion which is recognised by top recruiters and companies across the world - You're definitely in safe hands.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}