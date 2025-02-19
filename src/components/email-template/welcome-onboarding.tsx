import {
  Body,
  Container,
  Head,
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

interface WelcomeOnboardingProps {
  sellerId: string;
  storeName: string;
}

export const WelcomeOnboarding = ({
  sellerId,
  storeName,
}: WelcomeOnboardingProps) => (
  <Html>
    <Head />
    <Preview>Welcome to 1 Market Philippines | Seller Hub</Preview>
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
            <Text style={paragraph}>
              Welcome to 1 Market Philippines | Seller Hub
            </Text>
            <Text style={paragraph}>
              Congratulations, {storeName}! You&apos;re joining over hundreds of
              sellers around the community who use 1 Market Philippines to
              manage products and sell to customers.
            </Text>
            <Text>Here&apos;s how to get started:</Text>
          </Section>
          <ul>
            <li className="mb-20">
              Finish setting up your account.
              <Text className="text-sm text-gray-600">
                Provide all the required details in your seller dashboard to
                complete the setup.
              </Text>
            </li>
            <li className="mb-20">
              Wait for your application approval.
              <Text className="text-sm text-gray-600">
                Our team will review your application, which typically takes 1-2
                business days. You will be notified once approved.
              </Text>
            </li>
            <li className="mb-20">
              Add your first product.
              <Text className="text-sm text-gray-600">
                Start listing your products with accurate details, descriptions,
                and images to attract customers.
              </Text>
            </li>
          </ul>
          <Section className="text-center">
            <Link
              href={`https://one-market-philippines-production.vercel.app/seller/${sellerId}/dashboard`}
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

export const WelcomeOnboardingHTML = (props: WelcomeOnboardingProps) =>
  render(<WelcomeOnboarding {...props} />, {
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
