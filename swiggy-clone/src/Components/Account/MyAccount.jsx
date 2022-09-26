import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setUserId } from "../../Redux/User/action";
import { usePersistUser } from "../Common/Util";
import { Header } from "../Header/Header";

const Section = styled.section`
    background: #e9ecee;
`;

const Inner = styled.div`
    max-width: 1200px;
    margin: 0px auto;
    padding: 50px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;    
`;

const OuterContainer = styled.div`
    width: 65%;
`;

const Container = styled.div`
    background: white;
    padding: 40px 60px;
    margin-bottom: 20px;
`;

const OrangBtn = styled.div`
    background: var(--primary);
    color: white;
    padding: 20px 0px;
    margin-top: 20px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
`;

export const MyAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    usePersistUser();

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        dispatch(setUserId(""));
        navigate("/");
    }

    return (

        <>
        <Header />
        <Section>
            <Inner>
                <OuterContainer>
                    <Container onClick={handleLogout}>
                        <OrangBtn>Logout</OrangBtn>
                    </Container>
                </OuterContainer>
            </Inner>
        </Section>
        </>
    );
};