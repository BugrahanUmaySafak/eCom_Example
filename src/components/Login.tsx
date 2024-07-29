import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/Login.css';

const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password too short').required('Required'),
});

const Login: React.FC = () => {
        return (
                <div className="login-container">
                        <h2>Login</h2>
                        <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={LoginSchema}
                                onSubmit={(values) => {
                                        console.log(values);
                                }}
                        >
                                {({ isSubmitting }) => (
                                        <Form>
                                                <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <Field type="email" name="email" className="form-control" />
                                                        <ErrorMessage name="email" component="div" className="error" />
                                                </div>
                                                <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <Field type="password" name="password" className="form-control" />
                                                        <ErrorMessage name="password" component="div" className="error" />
                                                </div>
                                                <button type="submit" className="btn" disabled={isSubmitting}>
                                                        Login
                                                </button>
                                        </Form>
                                )}
                        </Formik>
                </div>
        );
};

export default Login;
