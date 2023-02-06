import Image from "next/image";
import { Heading, Text } from "@ignite-ui/react";

import { ClaimUsernameForm } from "./components/ClaimUsernameForm";

import { Container, Hero, Preview } from "./styles";
import previewImage from "../../assets/app-preview.svg";

export default function Home() {
  return (
    <>
      <Container>
        <Hero>
          <Heading as="h1" size={"4xl"}>
            Agendamento descomplicado
          </Heading>
          <Text size={"lg"}>
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Caledário simbolizando aplicação em funcionamento"
          ></Image>
        </Preview>
      </Container>
    </>
  );
}
