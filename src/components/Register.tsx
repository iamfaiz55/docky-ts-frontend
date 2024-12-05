import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useRegisterMutation } from "../redux/apis/authApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Zod Schema for Validation
const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .nonempty("Name is required"),
    email: z
        .string()
        .email("Enter a valid email address")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .nonempty("Password is required"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const [resgierUser, {isSuccess}]= useRegisterMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        // console.log(data); 
        resgierUser(data)
    };

    useEffect(() => {
     if(isSuccess){
        toast.success("Register Success")
     }
    }, [isSuccess])
    

    return (
        <Container>
            <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Col xs={12} md={6} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h3 className="text-center mb-4">Register</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        {...register("name")}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
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

                                <Button variant="primary" type="submit" className="w-100">
                                    Register
                                </Button>
                                <div className="text-center mt-3">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/LOGIN" className="text-primary fw-bold">
                      login here
                    </Link>
                  </p>
                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
