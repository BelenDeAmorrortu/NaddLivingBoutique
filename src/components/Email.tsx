import { Logo } from "@/assets/images";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Img,
  Text,
} from "@react-email/components";
import * as React from "react";

type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

const EmailTemplate = ({ name, email, message }: EmailTemplateProps) => {
  const previewText = `${name} tiene una consulta.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="w-full h-[300px] bg-red flex-col-center">
            <Img
              src={
                "https://naddlivingboutique.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.34981d8d.png&w=1080&q=75"
              }
              alt="Nadd Living Boutique Logo"
              width={200}
              height={"auto"}
            />
          </Container>
          <Container className="my-[20px] mx-auto p-[20px] max-w-4xl">
            <Heading className="text-black text-[20px] font-normal text-left">
              <strong>{name} visitó la web y tiene una consulta.</strong>
            </Heading>
            <Hr className="my-[16px] mx-0 w-full" />
            <Text className="text-black text-[14px] leading-[24px]">
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
