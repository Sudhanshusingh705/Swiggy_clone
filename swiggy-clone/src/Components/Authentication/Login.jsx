import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUserId } from "../../Redux/User/action";
import { loginUser } from "../../API/fetch";
import bcryptjs from "bcryptjs";

const DisplayFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const H2 = styled.h2`
    font-size: 2rem;
    margin: 25px 0px 10px;
`;

const OrangeBtn = styled.span`
    color: var(--primary);
    cursor: pointer;
`;

const Input = styled.input`
    border: 1px solid #d4d5d9;
    outline: 0;
    padding: 20px;
    font-size: 1.4rem;
    font-family: "Proxima Nova";
    width: 90%;

    &:nth-child(even) {
        border-bottom: none;
    }
`;

const Submit = styled.div`
    background: var(--primary);
    color: white;
    padding: 20px 0px;
    margin-top: 20px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
`;

const TC = styled.div`
    font-size: 0.8rem;
    opacity: 0.7;
    margin-top: 10px;
`;

export const Login = ({hiddenLogin}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        localStorage.removeItem("user_id");
    }, []);

    const signinUser = async () => {
        let res = await loginUser(email, pwd);
        if(res == "invalid") {
            alert("Invalid Username/PWD");
            return;
        }
        dispatch(setUserId(res.user_id));
        localStorage.setItem("user_id", res.user_id);
        hiddenLogin("none");
    };

    const demoLogin = () => {
        const user_id = bcryptjs.hashSync((new Date()) + "", 8);
        dispatch(setUserId(user_id));
        localStorage.setItem("user_id", user_id);
        hiddenLogin("none");
    };

    return (
        <section>
            <DisplayFlex>
                <div>
                    <H2>Login</H2>
                    <div>or&nbsp;<OrangeBtn onClick={() => hiddenLogin("signup")}>Create an account</OrangeBtn>
                    </div>
                    
                </div>
                <img src="/authenticate.webp" width="100px" />
            </DisplayFlex>
            <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input id="pwd" type="password" onChange={(e) => setPwd(e.target.value)} placeholder="Password" />
            <Submit onClick={signinUser}>LOGIN</Submit>
            <TC>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</TC>
            <TC onClick={demoLogin}>Click here for 1-click Guest Login</TC>
        </section>
    )
};