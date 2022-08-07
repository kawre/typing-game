import { Form, Formik } from "formik";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../api/auth";
import { client } from "../../components/AppWrapper";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import Text from "../../components/Text";
import { Token } from "../../utils/Objects/Token";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Login: React.FC<Props> = () => {
  const { mutateAsync } = useMutation(["me"], login);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (input: any, { setErrors }) => {
        const res = await mutateAsync(input, {
          onSuccess: () => client.invalidateQueries(),
        });

        const hash: Record<string, string> = {};
        Object.keys(input).forEach((m) => {
          if (input[m] === "") hash[m] = "Required";
        });
        if (Object.keys(hash).length) return setErrors(hash);

        if (res.message)
          return setErrors({
            username: res.message[0],
            password: res.message[0],
          });

        Token.set(res.accessToken);
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Input name="username" placeholder="Username" />
          <Input name="password" type="password" placeholder="Password" />
          <Footer>
            <Button isLoading={isSubmitting}>Login</Button>
            <Text fontSize="0.75rem" textAlign="right">
              Dont have an account?{" "}
              <Link to="/register">
                <span>Register</span>
              </Link>
            </Text>
          </Footer>
        </Form>
      )}
    </Formik>
  );
};

export default Login;

// Styled ------------------------------------------------------------------------

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 24px; */

  a {
    color: ${({ theme }) => theme.colors.main};
  }
`;
