import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// Main container for the form
const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Container for the sign-up form
const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    `
      : null}

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Container for the sign-in form
const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Form element
const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

// Title for the form
const Title = styled.h1`
  font-weight: bold;
  color: #46703b;
  margin: 0;
`;

// Input fields
const Input = styled.input`
  background-color: #e7eed1;
  border: none;
  border-radius: 18px;
  padding: 13px 20px;
  margin: 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 60%;
`;

// Button styles
const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #face1b;
  background-color: #face1b;
  color: #ffffff;
  font-size: 14px;
  margin: 10px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

// Ghost button style (for transparent buttons)
const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
  font-size: 15px;
`;

// Anchor tag style
const Anchor = styled.a`
  color: #46703b;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  margin: 15px 0;
`;

// Overlay container
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }
`;

// Overlay styles for background gradient
const Overlay = styled.div`
  background: #ccd8cc;
  background: linear-gradient(to right, #6cc14b, #a1d804);
  background: linear-gradient(to right, #6cc14b, #face1b);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }
`;

// Overlay panels for sign-in and sign-up
const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  height: 90%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

// Left overlay panel for sign-in
const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
  color: #fff;
`;

// Right overlay panel for sign-up
const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(20);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
  color: #fff;
`;

// Paragraph style
const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 10px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  margin-top: 10px;
`;

// Label for radio option
const RadioLabel = styled.label`
  margin-right: 10px;
`;

// Radio input
const RadioInput = styled.input`
  margin-right: 5px;
`;
// Main functional component for the login/signup form
function Login() {
  // State to manage sign-in/sign-up toggle
  const [signIn, setSignIn] = useState(true);

  // Function to toggle between sign-in and sign-up
  const handleToggle = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };
  const navigate = useNavigate();
  const handlePath=()=>{
    navigate('/')
  }
  return (
    
    <Container>
      {/* Sign-up container */}
      <SignUpContainer signinIn={signIn}>
        <Form>
          <Title>Signup</Title>
          <Input type="text" placeholder="Full Name" />
          <Input type="email" placeholder="Email" />
          <Input type="number" placeholder="Age"></Input>
          <RadioContainer>
            <RadioLabel>
              <RadioInput type="radio" name="gender" value="male" />
              Male
            </RadioLabel>
            <RadioLabel>
              <RadioInput type="radio" name="gender" value="female" />
              Female
            </RadioLabel>
            <RadioLabel>
              <RadioInput type="radio" name="gender" value="other" />
              Other
            </RadioLabel>
          </RadioContainer>
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <Button>Sign Up</Button>
        </Form>
      </SignUpContainer>

      {/* Sign-in container */}
      <SignInContainer signinIn={signIn}>
        <Form>
          <Title>Login</Title>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Anchor href="#">Forgot your password?</Anchor>
          <Button onClick={() => handlePath()}>LOGIN</Button>
        </Form>
      </SignInContainer>

      {/* Overlay container */}
      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          {/* Left overlay panel */}
          <LeftOverlayPanel signinIn={signIn}>
            <h1>Welcome Back!</h1>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton onClick={handleToggle}>Sign In</GhostButton>
          </LeftOverlayPanel>

          {/* Right overlay panel */}
          <RightOverlayPanel signinIn={signIn}>
            <h1>Hello, Friend!</h1>
            <Paragraph>
              Enter Your personal details and start the journey with us
            </Paragraph>
            <GhostButton onClick={handleToggle}>Sign Up</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
}

export default Login;
