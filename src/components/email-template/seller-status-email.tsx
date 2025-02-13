import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  render,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SellerStatusProps {
  sellerId: string;
  storeName: string;
  reason: string;
  verify: string;
}

export const SellerStatus = ({
  sellerId,
  storeName,
  reason,
  verify,
}: SellerStatusProps) => (
  <Html>
    <Head />
    <Preview>Your application has been {verify} | 1 Market Philippines</Preview>
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
          <Section style={body}>
            <Text style={paragraph}>Your application has been {verify}</Text>
            {verify === "Approved" ? (
              <Text style={paragraph}>
                Congratulations, {storeName}! You&apos;re application has been{" "}
                {verify}.{" "}
              </Text>
            ) : (
              <Text style={paragraph}>
                We regret to inform you that your application has been {verify}{" "}
                due to the following reason: {reason}.{" "}
              </Text>
            )}
          </Section>
          <Section className="text-center">
            <Link
              href={`http://localhost:3000/seller/${sellerId}/dashboard`}
              style={button}
            >
              Go to your dashboard
            </Link>
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
            href="https://onemarketphilippines.com"
            target="_blank"
            style={link}
          >
            onemarketphilippines.com
          </Link>
          . View our{" "}
          <Link
            href="https://onemarketphilippines.com/privacy-policy"
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

export const SellerStatusHTML = (props: SellerStatusProps) =>
  render(<SellerStatus {...props} />, {
    pretty: true,
  });

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const button = {
  backgroundColor: "#ea580c",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
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

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const ratingContent = {
  paddingLeft: "30px",
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
