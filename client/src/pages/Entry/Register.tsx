import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../api/auth";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import Text from "../../components/Text";
import { mapErrors } from "../../utils/mapErrors";
import { Token } from "../../utils/Objects/Token";
import FormWrapper from "../../components/Form/FormWrapper";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Register: React.FC<Props> = () => (
  <FormWrapper>
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (input, { setErrors }) => {
        const res = await register(input);

        if (res.message) return setErrors(mapErrors(res.message));
        if (res.error)
          return setErrors({
            username: res.error,
            password: res.error,
            email: res.error,
          });

        Token.set(res.accessToken);
        window.location.reload();
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
  </FormWrapper>
);
export default Register;

// Styled ------------------------------------------------------------------------

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${({ theme }) => theme.colors.main};
  }
`;
