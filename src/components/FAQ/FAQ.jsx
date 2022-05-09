import { useState } from "react";
import "./FAQ.css";

export default function FAQ(props){
    
    const icon = <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9998 13.4004L11.9998 5.40039L3.9998 13.4004L0.799805 11.8004L11.9998 0.600391L23.1998 11.8004L19.9998 13.4004Z" fill="#0D1E3A"/>
                </svg>;

    let ques = [];
    for(let d of props.data){
        ques.push({
            question : d.question,
            answer : d.answer,
            show : false
        });
    }
    if(ques.length > 0){
        ques[0].show = true;
    }
    const [questions, setQuestions] = useState(ques);

    const setShow = (index) => {
        let qs = [...questions];
        for(let i = 0; i<qs.length; i++){
            if(i === index){
                if(qs[i].show === true){
                    qs[i].show = false;
                }else{
                    qs[i].show = true;
                }
            }else{
                qs[i].show = false;
            }
        }
        setQuestions(qs);
    }
    return (
        <section className="faq_main" style={{'clear': 'both'}}>
            <div className="container">
                <header>
                    <h3><b>FAQ</b>
                        </h3>
                    <p>All your questions answered. Learn more about our courses, your career questions and other important things you need to know.</p>
                </header>
                
                <div className="accordion" id="accordionExample">
                    {questions.map((faq,index) => 
                        <div key={index} className="card border-0">
                            <div className="card-head" id="headingOne" onClick={() => setShow(index)}>
                                <h4 className={faq.show ? "collapsed " : " " +"mb-0"} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <b>{faq.question}</b>
                                    {icon}
                                </h4>
                            </div>
                    
                            <div id="collapseOne" className={faq.show ? "show " : " " +"collapse"} aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}