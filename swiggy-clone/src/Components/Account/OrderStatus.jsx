import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePersistUser } from "../Common/Util";
import { Header } from "../Header/Header";

const Section = styled.section`
    background: #e9ecee;
    text-align: center;
`;

const Inner = styled.div`
    max-width: 600px;
    margin: 0px auto;
    padding: 50px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;    
`;

const OuterContainer = styled.div`
    
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

    a {
        color: white;
        text-decoration: none;
    }
`;

export const OrderStatus = () => {

    usePersistUser();

    return (

        <>
        <Header />
        <Section>
            <Inner>
                <OuterContainer>
                    <Container>
                        <h2>Your order has been successfully placed</h2>
                        <img width="100%" src="/order_placed.jpeg" />
                        <OrangBtn><Link to="/city/Delhi">Browse More</Link></OrangBtn>
                    </Container>
                </OuterContainer>
            </Inner>
        </Section>
        </>
    );
};