import { useEffect } from "react";
import styled from "styled-components";
import { Login } from "./Login";
import { Signup } from "./Signup";

const Section = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(40, 44, 63, 0.7);
    z-index: 1000;
`;

const Inner = styled.div`
    position:fixed;
    background: white;
    width: 30%;
    height: 100%;
    top:0;
    right:0;
    transform: translate3d(0%, 0, 0);
    padding: 40px 50px;
`;

const Close = styled.div`
    cursor: pointer;
    font-size: 2rem;
`;

export const Authentication = ({hideLogin, isLogin}) => {

    useEffect(() => {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;

        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        };
    }, []);

    const handleClick = (e) => {
        if(e.target.id == "outer" || e.target.id == "close") hideLogin("none");
    };

    const hiddenLogin = (val) => {
        hideLogin(val);
    }

    return (
        <Section id="outer" onClick={handleClick}>
            <Inner>
                <Close id="close" onClick={handleClick}>X</Close>
                {isLogin == "login" ? <Login hiddenLogin={hiddenLogin} /> : <Signup hiddenLogin={hiddenLogin} />}
            </Inner>
        </Section>
    );
};