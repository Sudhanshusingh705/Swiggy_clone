import styled from "styled-components";
import bcryptjs from "bcryptjs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/User/action";
import { createUser } from "../../API/fetch";

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
    border-bottom: none;

    &:nth-last-child(3) {
        border-bottom: 1px solid #d4d5d9;
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

export const Signup = ({hiddenLogin}) => {

    const user_id = bcryptjs.hashSync((new Date()) + "", 8);

    const [user, setUser] = useState({user_id: user_id});
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem("user_id");
    }, []);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setUser({...user,
          [id]: value
        });    
    };

    const createNewUser = async () => {
        if(!user.name || user.name.trim() == "")
            return;
        if(!user.email || user.email.trim() == "")
            return;
        if(!user.pwd || user.pwd.trim() == "")
            return;
        if(!user.number || user.number.trim() == "")
            return;
        await createUser(user);
        dispatch(setUserId(user.user_id));
        localStorage.setItem("user_id", user.user_id);
        hiddenLogin("none");
    };

    return (
        <section>
            <DisplayFlex>
                <div>
                    <H2>Signup</H2>
                    <div>or&nbsp;<OrangeBtn onClick={() => hiddenLogin("login")}>login to your account</OrangeBtn>
                    </div>
                    
                </div>
                <img src="/authenticate.webp" width="100px" />
            </DisplayFlex>
            <Input id="number" type="number" onChange={handleChange} placeholder="Phone number" />
            <Input id="name" type="text" onChange={handleChange} placeholder="Name" />
            <Input id="email" type="email" onChange={handleChange} placeholder="Email" />
            <Input id="pwd" type="password" onChange={handleChange} placeholder="Password" />
            <Submit onClick={createNewUser}>CONTINUE</Submit>
            <TC>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</TC>
        </section>
    )
};