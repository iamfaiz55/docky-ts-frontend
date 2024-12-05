import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useLoginMutation } from '../redux/apis/authApi';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-bootstrap/lib/Navbar';
// import { useLoginMutation } from '../redux/apis/authApi';


const loginSchema = z.object({
    email: z.string().email("Enter a valid email address").nonempty("Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .nonempty("Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const [loginUser,{isSuccess} ]= useLoginMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        // console.log(data);
        loginUser(data) 
    };
const navigate = useNavigate()
    useEffect(() => {
     if(isSuccess){
           toast.success("login success")
           navigate("/")
     }
    })
    
    return (
        <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col xs={12} md={6} lg={5}>
            <Card className="shadow-lg">
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email Input */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
  
                  {/* Password Input */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
  
                  {/* Submit Button */}
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
  
                {/* Register Link */}
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary fw-bold">
                      Register here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default Login;
