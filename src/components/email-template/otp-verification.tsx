import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OtpVerificationProps {
  otpCode: string;
}

export const OtpVerification = ({ otpCode }: OtpVerificationProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={coverSection}>
          <Section style={imageSection}>
            <Img
              src={
                "https://firebasestorage.googleapis.com/v0/b/personaapplication-b086b.appspot.com/o/logo.png?alt=media&token=9bce8b60-ce3c-4569-b217-09fdba9d6cee"
              }
              width="60"
              height="60"
              alt="Logo"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Verify your email address</Heading>
          <Section style={body}>
            <Text style={paragraph}>Verification code</Text>
            <Text style={tokenStyle}>{otpCode}</Text>
            <Text style={paragraph}>
              Thanks for starting the new 1 Market Philippines seller account
              creation process. We want to make sure it&apos;s really you.
              Please enter the following verification code when prompted. If you
              don&apos;t want to create an account, you can ignore this message.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- 1 Market Philippines
          </Text>
          <Hr />
          <Text style={text}>
            1 Market Philippines will never email you and ask you to disclose or
            verify your password, credit card, or banking account number.
          </Text>
        </Section>

        <Text style={footerText}>
          This message was produced and distributed by 1 Market Philippines. ©
          2025. All rights reserved. 1 Market Philippines is a registered
          trademark of{" "}
          <Link
            href="https://one-market-philippines-production.vercel.app"
            target="_blank"
            style={link}
          >
            onemarketphilippines.com
          </Link>
          . View our{" "}
          <Link
            href="https://one-market-philippines-production.vercel.app/privacy-policy"
            target="_blank"
            style={link}
          >
            privacy policy
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);

export const OtpVerificationHTML = (props: OtpVerificationProps) =>
  render(<OtpVerification {...props} />, {
    pretty: true,
  });

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const logo = {
  display: "block",
  margin: "0 auto",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "14px",
};

const container = {
  padding: "20px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const tokenStyle = {
  fontSize: "36px",
  fontWeight: "bold",
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
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};
