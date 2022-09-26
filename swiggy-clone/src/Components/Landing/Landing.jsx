import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Authentication } from "../Authentication/Authentication";
import { DisplayFlex, Section } from "../Common/Style";
import { useSelector } from "react-redux";
import { usePersistUser } from "../Common/Util";

const SVG = styled.svg`
    fill: var(--primary);
    height: 225px;
    width: 200px;
`; 

const DivLeft = styled.div`
    padding: 40px;
    width: 42%;
    margin-left: 5%;
`;

const DivInner = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BtnContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
`;

const DarkBtn = styled.div`
    padding: 12px 20px;
    font-family: "Proxima Nova Bold";
    cursor: pointer;

    &:hover {
        color: var(--primary);
    }
`;

const LightBtn = styled.div`
    padding: 12px 30px;
    color: white;
    background: black;
    font-family: "Proxima Nova Bold";
    cursor: pointer;
`;

const H2 = styled.h2`
    margin-top: -75px;
`;

const TagLine = styled.div`
    color: var(--light);
    font-size: 1.6rem;
    letter-spacing: -0.05rem;
    margin: -20px 0px 40px;
`;

const Input = styled.input`
    padding: 0px 15px;
    width: 75%;
    caret-color: var(--primary);
    outline: 0;
    height: 60px;
    border: 1px solid #bebfc5;
    font-family: "Proxima Nova Bold";
    font-size: 1.1rem;

    &:hover {
        border: 1px solid var(--primary);
    }
`;

const OrangeBtn = styled.div`
    color: white;
    background: var(--primary);
    font-family: "Proxima Nova Bold";
    width: 25%;
    height: 42px;
    text-align: center;
    padding: 20px 0px 0px;
    cursor: pointer;
`;

const H3 = styled.div`
    color: var(--lighter);
    font-size: 1rem;
    margin: 40px 0px 10px;
`;

const UL = styled.ul`
    list-style: none;
    padding-inline-start: 0px;
`;

const LI = styled.li`
    display: inline-block;
    font-family: "Proxima Nova Bold";
    margin-right: 8px;
    cursor: pointer;

    &:nth-child(odd) {
        color: var(--light);
    }

    &:nth-child(even) {
        color: var(--light-2);
    }
`;

const DivRight = styled.div`
    width: 53%;
    background-image: url("/Lunch1_vlksgq.webp");
    background-size: cover;
`;

const FeaturesDiv = styled.div`
    background: #2b1e16;
    padding: 0px 7% 60px;
    display: flex;
    justify-content: space-between;

    & > div {
        text-align: center;
        width: 260px;
    }

    & > div > img {
        height: 250px;
    }

    & > div > h3 {
        color: white;
        font-size: 1.4rem;
        margin-top: 30px;
    }

    & > div > p {
        color: #e0cbc1;
        line-height: 1.3rem;
    }
`;

const DivLeft1 = styled.div`
    padding: 100px 40px;
    width: 30%;
    margin: 0px 5%;
`;

export const Landing = () => {

    const [city, setCity] = useState("");
    const [isLogin, setIsLogin] = useState("none");
    const navigate = useNavigate();
    const user_id = useSelector(state => state.user_id);
    
    const handleClick = (e) => {
        if(city != "") navigate(`/city/${city}`);
    };

    usePersistUser();

    return (
        <>
        <Section>
            <DisplayFlex>
                <DivLeft>
                    <DivInner>
                        <SVG width="200" viewBox="0 0 200 200"><path d="M19.9253444,58.766315 C19.8876048,58.7384908 19.8458927,58.7037105 19.8021942,58.6654521 C19.094081,57.7879944 14.7152991,52.3026415 10.2535896,45.2670801 C8.91532497,43.0252402 8.046322,41.2767839 8.21317057,40.8246398 C8.64965835,39.6490651 16.4279798,39.0056292 18.8234486,40.0713975 C19.5519214,40.3948545 19.5335482,40.8231492 19.5335482,41.0725738 C19.5335482,42.1487762 19.4804148,45.0365363 19.4804148,45.0365363 C19.4809114,45.6332671 19.9660634,46.1172104 20.5634408,46.1162167 C21.1618115,46.1162167 21.6449771,45.630286 21.6429908,45.0320645 L21.6305765,37.8365137 L21.6285902,37.8365137 C21.6285902,37.2119586 20.9467953,37.055944 20.8186794,37.0315978 C19.5683083,37.0256354 17.0293299,37.0171888 14.3031434,37.0171888 C8.28765654,37.0171888 6.94343308,37.264129 5.92148558,36.5958501 C3.707266,35.1479951 0.0867513255,25.3896318 0.0023338937,19.8993102 C-0.117836803,12.1537335 4.47149205,5.44808831 10.9338947,2.12557426 C13.6337628,0.766160708 16.6832184,0 19.9039917,0 C30.132405,0 38.555775,7.72023676 39.6765405,17.6529986 C39.6775337,17.6614452 39.6775337,17.6708856 39.67952,17.6793322 C39.8851013,20.0806647 26.6504342,20.5909417 24.0325007,19.8923542 C23.6312696,19.785032 23.528479,19.3741274 23.528479,19.1972447 C23.5254995,17.371278 23.5130852,12.2327345 23.5130852,12.2327345 C23.5110989,11.6355068 23.025947,11.1510667 22.4285695,11.1525572 L22.4275764,11.1525572 C21.831192,11.153551 21.3470332,11.6389848 21.3470332,12.2372063 L21.3683859,21.7029181 C21.3867591,22.2991521 21.8873048,22.4601353 22.024359,22.4869659 C23.5130852,22.4874627 26.9945594,22.4839847 30.2371819,22.4839847 C34.6199364,22.4839847 36.460733,22.9917773 37.6857789,23.9243867 C38.5001588,24.5454638 38.8154827,25.7344538 38.5398847,27.2796936 C36.0823442,41.0258688 20.5103075,58.0562997 19.9253444,58.766315 Z M62.158293,26.6840558 C66.0871796,28.3679201 68.5213811,30.23612 68.5213811,34.3367194 C68.5213811,38.5257602 65.3482788,41.2316689 60.4386603,41.2316689 C56.4601164,41.2316689 53.2666546,39.4295516 51.6761309,36.2864046 L51.418906,35.7796057 L56.0966249,33.0692253 L56.4030105,33.5700618 C57.4562421,35.2916875 58.633617,36.0255522 60.3418285,36.0255522 C61.8141679,36.0255522 62.8033415,35.3731729 62.8033415,34.4013114 C62.8033415,33.3246122 62.0872831,32.9211605 59.8740566,31.9522802 L58.7493185,31.4698275 C55.7475339,30.1904087 52.9667244,28.4126376 52.9667244,24.1068343 C52.9667244,20.2372755 55.9327557,17.5348449 60.1799457,17.5348449 C63.3977396,17.5348449 65.6030208,18.7804771 67.1210449,21.4535929 L67.4026018,21.9499577 L62.8703789,24.8625609 L62.5580344,24.3035915 C61.8002638,22.9481529 61.0866882,22.6763695 60.1799457,22.6763695 C59.2319876,22.6763695 58.6212026,23.199068 58.6212026,24.0099463 C58.6212026,24.9415619 59.0710979,25.3504791 61.0320652,26.2001125 L62.158293,26.6840558 Z M95.2686968,27.476898 L98.5709081,18.2690574 L104.238794,18.2690574 L95.8387627,41.611619 L94.5799498,41.611619 L89.484613,30.6796684 C89.2477476,30.1788318 89.0034336,29.556761 88.7928866,28.9868606 C88.5773739,29.5577547 88.327101,30.1813161 88.089739,30.6821527 L82.7952763,41.611619 L81.5449052,41.611619 L73.0103029,18.2690574 L79.065019,18.2690574 L82.4034802,27.476898 C82.61651,28.0641885 82.8350022,28.7801662 83.0261829,29.4444702 C83.2531168,28.7588011 83.5257354,28.0184772 83.8107684,27.4217464 L88.1955091,18.0767719 L89.4086373,18.0767719 L93.8614085,27.4227401 C94.1454483,28.0189741 94.4190601,28.7597949 94.6450009,29.445464 C94.8371747,28.7801662 95.0571566,28.0641885 95.2686968,27.476898 Z M110.84853,40.9414023 L110.84853,17.7921198 L116.569052,17.7921198 L116.569052,40.9414023 L110.84853,40.9414023 Z M135.325265,33.163629 L135.325265,27.9903052 L145.94746,27.9903052 L145.94746,38.3652739 L145.727975,38.5461315 C144.512861,39.5438298 141.291094,41.2316689 136.926713,41.2316689 C129.564023,41.2316689 124.423995,36.3529841 124.423995,29.3676057 C124.423995,22.5114114 129.383767,17.5348449 136.217607,17.5348449 C139.975672,17.5348449 142.730163,18.594154 144.637004,20.7738862 L145.009434,21.1996966 L141.110342,25.059815 L140.686765,24.6235704 C139.59778,23.500663 138.469566,22.8050567 136.217607,22.8050567 C132.717263,22.8050567 130.272137,25.5035125 130.272137,29.3676057 C130.272137,33.3926822 132.883118,35.99425 136.926713,35.99425 C138.267957,35.99425 139.664321,35.7632093 140.614762,35.394041 L140.614762,33.163629 L135.325265,33.163629 Z M164.314658,33.163629 L164.314658,27.9903052 L174.936853,27.9903052 L174.936853,38.3652739 L174.717368,38.5461315 C173.501261,39.5438298 170.280487,41.2316689 165.917099,41.2316689 C158.554409,41.2316689 153.413388,36.3529841 153.413388,29.3676057 C153.413388,22.5114114 158.374153,17.5348449 165.206006,17.5348449 C168.966058,17.5348449 171.720549,18.594154 173.626397,20.7738862 L173.99982,21.1996966 L170.101721,25.059815 L169.677151,24.6235704 C168.587669,23.500663 167.458959,22.8050567 165.206006,22.8050567 C161.706656,22.8050567 159.26153,25.5035125 159.26153,29.3676057 C159.26153,33.3926822 161.873504,35.99425 165.917099,35.99425 C167.258343,35.99425 168.653714,35.7632093 169.604155,35.394041 L169.604155,33.163629 L164.314658,33.163629 Z M195.897503,17.7922192 L201.87674,17.7922192 L193.669876,33.1964218 L193.669876,40.9415017 L187.918566,40.9415017 L187.918566,33.5253443 L179.1759,17.7922192 L185.555871,17.7922192 L189.596487,25.1730995 C190.030988,25.9760279 190.484856,27.0373245 190.827988,27.8988826 C191.155726,27.0442805 191.589235,25.9924244 192.020757,25.1800555 L195.897503,17.7922192 Z"></path></SVG>
                        <BtnContainer>
                            {!user_id && <><DarkBtn onClick={() => setIsLogin("login")}>Login</DarkBtn><LightBtn onClick={() => setIsLogin("signup")}>Sign up</LightBtn></>}
                            {user_id && <DarkBtn onClick={() => navigate("my-account")}>My Account</DarkBtn>}
                        </BtnContainer>
                    </DivInner>
                    <H2>Unexpected Guests?</H2>
                    <TagLine>Order food from favourite restaurants near you.</TagLine>
                    <DisplayFlex>
                        <Input placeholder="Enter your delivery location" onChange={(e) => setCity(e.target.value)} />
                        <OrangeBtn onClick={handleClick}>FIND FOOD</OrangeBtn>
                    </DisplayFlex>
                    <H3>POPULAR CITIES IN INDIA</H3>
                    <UL>
                        <LI onClick={()=> navigate("/city/ahmedabad")}>Ahmedabad</LI>
                        <LI onClick={()=> navigate("/city/Bangalore")}>Bangalore</LI>
                        <LI onClick={()=> navigate("/city/Chennai")}>Chennai</LI>
                        <LI onClick={()=> navigate("/city/Delhi")}>Delhi</LI>
                        <LI onClick={()=> navigate("/city/Gurgaon")}>Gurgaon</LI>
                        <LI onClick={()=> navigate("/city/Hyderabad")}>Hyderabad</LI>
                        <LI onClick={()=> navigate("/city/Kolkata")}>Kolkata</LI>
                        <LI onClick={()=> navigate("/city/Mumbai")}>Mumbai</LI>
                        <LI onClick={()=> navigate("/city/Pune")}>Pune</LI>
                        <LI onClick={()=> navigate("/city/ahmedabad")}>& more</LI>
                    </UL>
                </DivLeft>
                <DivRight></DivRight>
            </DisplayFlex>  
        </Section>
        <FeaturesDiv>
            <div>
                <img src="/feature1.webp" />
                <h3>No Minimum Order</h3>
                <p>Order in for yourself or for the group, with no restrictions on order value</p>
            </div>
            <div>
                <img src="/feature2.webp" />
                <h3>Live Order Tracking</h3>
                <p>Know where your order is at all times, from the restaurant to your doorstep</p>
            </div>
            <div>
                <img src="/feature3.webp" />
                <h3>Lightning-Fast Delivery</h3>
                <p>Experience Swiggy's superfast delivery for food delivered fresh & on time</p>
            </div>
        </FeaturesDiv>
        <DisplayFlex>
            <DivLeft1>
                <h2>Restaurants in your pocket</h2>
                <TagLine>Order from your favorite restaurants & track on the go, with the all-new Swiggy app.</TagLine>
                <DivInner>
                    <img width="48%" src="/play_store.webp" />
                    <img width="48%" src="/app_store.webp" />
                </DivInner>
            </DivLeft1>
            <DivInner>
                <img height="489px" src="/ss1.webp" />
                <img style={{marginTop: "100px"}} width="380px" src="/ss2.webp" />
            </DivInner>
        </DisplayFlex>
        {isLogin != "none" && <Authentication hideLogin={(val) => setIsLogin(val)} isLogin={isLogin} />}
        </>
    );
};