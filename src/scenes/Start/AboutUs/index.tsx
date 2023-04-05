import styled from "@emotion/styled";
import Details from "../Details";
import logo from '../assets/chap0lin-logo.png';

interface AboutProps {
    goBack: () => void,
}

export default function AboutUs({ goBack }: AboutProps) {

    const Sobre = () => (<>
        <Image src={logo}/>
        <NarrowParagraph>
            Olá, seja bem-vindo à Chap0lin Solutions, nossa empresa de desenvolvimento de jogos online e sites! 
        </NarrowParagraph>
        <Paragraph>
            Nós somos uma equipe apaixonada por criar entretenimento para pessoas de todas as idades e gostos.
        </Paragraph>
        <Paragraph>
            Nosso objetivo é oferecer experiências inovadoras e envolventes aos nossos usuários, através de jogos online criativos e sites dinâmicos que atendam aos mais altos padrões de qualidade.
        </Paragraph>
        <Paragraph>
            Nós nos dedicamos a oferecer um serviço personalizado, adaptado às necessidades e preferências individuais de cada um de nossos clientes. Seja a criação de jogos educacionais ou jogos de aventura, estamos sempre em busca de inovar e superar as expectativas.
        </Paragraph>
        <Paragraph>
            Nosso trabalho é fruto de um esforço constante em pesquisa e desenvolvimento, aliado a um conhecimento técnico e criativo que nos permite transformar ideias em realidade.
        </Paragraph>
        <Paragraph>
            Por isso, estamos sempre em busca de novos desafios e oportunidades para inovar e apresentar nossos produtos aos mais variados públicos. Seja você um usuário em busca de diversão ou um investidor em busca de inovação, estamos sempre prontos para apresentar o melhor de nosso trabalho em jogos online e sites.
        </Paragraph>
        <Paragraph>
            Então, venha conhecer nossos produtos, e faça parte da nossa história de sucesso!
        </Paragraph>
    </>)

    return (
        <Details goBack={goBack}>
            <Sobre />        
        </Details>
    )
}

const Image = styled.img`
    margin-left: 10px;
    width: 25%;
    object-fit: scale-down;
`;

const Paragraph = styled.p`
    color: rgba(0, 0, 0, 0.6);
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    text-justify: inter-word;
    text-align: justify;
`;

const NarrowParagraph = styled(Paragraph)`
    width: 60%;
`;