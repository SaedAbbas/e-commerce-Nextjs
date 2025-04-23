import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const SaeedPersonalIntroEmail = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={center}>
          <Img
            src='https://res-console.cloudinary.com/duy8f6qfb/thumbnails/v1/image/upload/v1745395593/bWVkaXVtX3NhZWRfMjVlMGQ3MTUxNQ==/drilldown' // تأكد إن الصورة مرفوعة في هذا المسار
            width="100"
            height="100"
            alt="Saeed's Photo"
            style={avatar}
          />
        </Section>
        <Heading style={heading}>مرحبًا، أنا سعيد 👋</Heading>
        <Text style={paragraph}>
          مطوّر واجهات أمامية من غزة، شغوف بتقنيات الويب الحديثة زي React و Next.js. بحب أضيف لمسة جمال وأناقة على كل مشروع بشتغل عليه ✨.
        </Text>
        <Text style={paragraph}>
          رغم التحديات، مكمل في طريقي 💪 بحلم أشتغل في بيئة احترافية وأنفّذ مشاريع تفرّح القلب والعين ❤️.
        </Text>
        <Text style={paragraph}>
          لو وصلك الإيميل ده، فأنت أكيد شفت شغل من شغلي، ويا رب يكون عجبك 🙌
        </Text>
        <Hr style={hr} />
        <Text style={footer}>تحياتي،<br />سعيد</Text>
      </Container>
    </Body>
  </Html>
);

export default SaeedPersonalIntroEmail;

// ====== Styles ======

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: '20px 0',
};

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  textAlign: 'center',
  color: '#333',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#555',
  marginBottom: '16px',
  textAlign: 'center',
};

const avatar = {
  borderRadius: '50%',
  marginBottom: '20px',
};

const center = {
  textAlign: 'center',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const footer = {
  textAlign: 'center',
  fontSize: '14px',
  color: '#888',
};
