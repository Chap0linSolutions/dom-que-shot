import styled from '@emotion/styled';
import Details from '../Details';

interface PrivacyProps {
  goBack: () => void;
}

export const Politica = () => (
  <>
    <Title>Política de privacidade</Title>
    <Paragraph>
      Esta política de privacidade tem como objetivo informar como os dados
      pessoais são coletados, utilizados, compartilhados e armazenados em nosso
      site.
    </Paragraph>
    <Title>Coleta de dados pessoais</Title>
    <Paragraph>
      Nós coletamos dados pessoais apenas quando você os fornece voluntariamente
      ao entrar em uma das salas do nosso jogo ou preencher um formulário de
      contato. Os dados coletados podem incluir seu nome, endereço de e-mail,
      telefone e outras informações relevantes para o serviço que fornecemos.
    </Paragraph>
    <Title>Uso dos dados</Title>
    <Paragraph>
      Os dados coletados são utilizados apenas para fornecer os serviços
      solicitados ou para melhorar a experiência do usuário em nosso site. Não
      compartilhamos ou vendemos esses dados para terceiros.
    </Paragraph>
    <Title>Armazenamento dos dados</Title>
    <Paragraph>
      Os dados coletados são armazenados de forma segura em nossos servidores ou
      em servidores de terceiros, que têm políticas de privacidade semelhantes
      às nossas. Tomamos medidas de segurança para garantir que os dados estejam
      protegidos contra perda, roubo, acesso não autorizado, divulgação,
      modificação ou destruição.
    </Paragraph>
    <Title>Cookies</Title>
    <Paragraph>
      Nós usamos cookies para melhorar a experiência do usuário em nosso site.
      Os cookies são pequenos arquivos de texto que são armazenados em seu
      navegador e permitem que seu navegador se lembre de suas preferências e
      interações anteriores em nosso site.
    </Paragraph>
    <Paragraph>
      Os cookies que utilizamos são de sessão e cookies persistentes. Os cookies
      de sessão são excluídos automaticamente quando você sai de nosso site ou
      fecha o navegador. Cookies persistentes permanecem em seu dispositivo até
      que sejam excluídos manualmente ou expirados pelo tempo estabelecido.
    </Paragraph>
    <Paragraph>
      Você pode optar por aceitar ou recusar nossos cookies. No entanto, ao
      optar por recusar os cookies, você pode não conseguir usar todas as
      funcionalidades do site.
    </Paragraph>
    <Title>Links para sites de terceiros</Title>
    <Paragraph>
      Nosso site pode conter links para sites de terceiros. Não teremos
      responsabilidade ou controle sobre o conteúdo e as políticas de
      privacidade desses sites. Procure ler as políticas de privacidade desses
      sites antes de fornecer qualquer informação pessoal.
    </Paragraph>
    <Title>Alterações nesta política</Title>
    <Paragraph>
      Reservamo-nos o direito de alterar esta política de privacidade a qualquer
      momento. As alterações serão publicadas em nosso site e a data da última
      revisão será atualizada na parte superior da página.
    </Paragraph>
    <Title>Entre em contato</Title>
    <Paragraph>
      Se você tiver dúvidas ou preocupações sobre nossa política de privacidade,
      entre em contato conosco através dos detalhes fornecidos em nosso site.
    </Paragraph>
  </>
);

export default function PrivacyPolicy({ goBack }: PrivacyProps) {
  return (
    <Details goBack={goBack}>
      <Politica />
    </Details>
  );
}

const Paragraph = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  text-justify: inter-word;
  text-align: justify;
`;

const Title = styled(Paragraph)`
  font-weight: 600;
`;
