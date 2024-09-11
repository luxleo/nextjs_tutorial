import {
    Link,
    Hr,
    Img,
    Heading,
    Section,
    Html,
    Text,
    Tailwind,
    Head,
    Preview,
    Body,
    Container,
    Markdown
} from "@react-email/components";

export default function Template({verificationCode}:{
    verificationCode: string;
}) {
    const previewText = `Verification Code HK E&C`;
    return (
        <Html lang={'ko'}>
            <Head/>
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className={'bg-white text-[#212121]'}>
                    <Container className={'p-[20px] my-0 mx-auto bg-[#eee]'} >
                        <Section style={coverSection}>
                            <Section style={imageSection}>
                                {/*필요한 에셋을 S3로 부터 가져오도록 한다.*/}
                                <Img
                                    src={`/hkenc_logo.png`}
                                    width="75"
                                    height="45"
                                    alt="AWS's Logo"
                                />
                            </Section>
                            <Section style={upperSection}>
                                <Heading style={h1}>이메일 주소 인증</Heading>
                                <Text style={mainText}>
                                    HKE&C에 문의 해주심에 감사드립니다.
                                    문의에 원활한 답변을 하기 위해 아래의 인증코드를 입력해주세요.
                                </Text>
                                <Section style={verificationSection}>
                                    <Text style={verifyText}>Verification code</Text>

                                    <Text style={codeText}>{verificationCode}</Text>
                                </Section>
                            </Section>
                            <Hr />
                            <Section style={lowerSection}>
                                <Text style={cautionText}>
                                    주)HK E&C에 문의하신적이 없다면, 본 메일을 무시 해주세요
                                </Text>
                            </Section>
                        </Section>
                        <Text style={footerText}>
                            copyright ⓒ HK E&C. All right Reserved.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
};

const main = {
    backgroundColor: "#fff",
    color: "#212121",
};

const container = {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee",
};

const h1 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
};

const link = {
    color: "#2754C5",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const imageSection = {
    backgroundColor: "#252f3d",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
    ...text,
    fontSize: "12px",
    padding: "0 20px",
};

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const,
};

const codeText = {
    ...text,
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const,
};

const validityText = {
    ...text,
    margin: "0px",
    textAlign: "center" as const,
};

const verificationSection = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px", whiteSpace: 'pre-line' };

const cautionText = { ...text, margin: "0px" };