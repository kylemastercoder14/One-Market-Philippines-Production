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

interface ProductStatusProps {
  status: string;
  storeName: string;
  productImage: string;
  productName: string;
}

export const ProductStatus = ({
  status,
  storeName,
  productImage,
  productName,
}: ProductStatusProps) => (
  <Html>
    <Head />
    <Preview>Your product has been {status}</Preview>
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
            <Text style={paragraph}>Your product has been {status}</Text>
            <Text style={paragraph}>
              Congratulations, {storeName}! You&apos;re product has been{" "}
              {status}. You can now start selling on 1 Market Philippines.
            </Text>
          </Section>
          <Section>
            <Row>
              <Column>
                <Img
                  src={productImage}
                  alt={productName}
                  width="274"
                  height="350"
                />
              </Column>

              <Column style={ratingContent}>
                <Text>
                  <strong>{productName}</strong>
                </Text>
              </Column>
            </Row>
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

export const ProductStatusHTML = (props: ProductStatusProps) =>
  render(<ProductStatus {...props} />, {
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
