import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@ignite-ui/react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, Container, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { FormAnnotation } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put("/users/profile", {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de perfil</Text>
            <Avatar src={session.data?.user.avatar_url} />
          </label>
          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register("bio")} />
            <FormAnnotation>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>
          <Button disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
