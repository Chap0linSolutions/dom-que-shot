import styled from "@emotion/styled";
import Details from "../Details";
import logo from '../assets/chap0lin-logo.png';

interface ContactProps {
    goBack: () => void,
}

export default function Contact({ goBack }: ContactProps) {

    const Contato = () => (<>
        <Image src={logo}/>
        <Title>
            Entre em Contato
        </Title>
        <Content>
            <Section>
                Site:
            </Section>
                <Link href="https://www.chap0lin.com">
                    www.chap0lin.com
                </Link>
            <Section>
                E-mail:
            </Section>
                <Link href="mailto:contato@chap0lin.com">
                    contato@chap0lin.com
                </Link>
        </Content>
    </>)

    return (
        <Details goBack={goBack}>
            <Contato />        
        </Details>

    )
}


const Title = styled.p`
    color: rgba(0, 0, 0, 0.6);
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    width: 100%;
`;

const Section = styled(Title)`
    text-decoration: underline;
    font-size: 20px;
    text-align: left;
    margin: 20px 0 10px;
`;

const Link = styled.a`
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
`;

const Image = styled.img`
    margin: 30px 0;
    width: 100%;
    height: 150px;
    object-fit: scale-down;
`;

const Content = styled.div`
    width: 80%;
    margin: 0 auto 40px;
`;