import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { Link } from "react-router-dom";
import { register } from "../../api/auth";
import { mapErrors } from "../../utils/mapErrors";
import { Token } from "../../utils/Objects/Token";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Register: React.FC<Props> = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (input, { setErrors }) => {
        const res = await register(input);
        if (res.message) return setErrors(mapErrors(res.message));

        Token.set(res.accessToken);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input name="username" placeholder="Username" />
          <Input name="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Footer>
            <Button isLoading={isSubmitting}>Register</Button>
            <Text fontSize="0.75rem" textAlign="right">
              Already have an account?{" "}
              <Link to="/login">
                <span>Login</span>
              </Link>
            </Text>
          </Footer>
        </Form>
      )}
    </Formik>
  );
};

export default Register;

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
