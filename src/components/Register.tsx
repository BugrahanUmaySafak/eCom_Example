import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/Register.css';

const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password too short').required('Required'),
        confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required'),
});

const Register: React.FC = () => {
        return (
                <div className="register-container">
                        <h2>Register</h2>
                        <Formik
                                initialValues={{ email: '', password: '', confirmPassword: '' }}
                                validationSchema={RegisterSchema}
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
                                                <div className="form-group">
                                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                                        <Field type="password" name="confirmPassword" className="form-control" />
                                                        <ErrorMessage name="confirmPassword" component="div" className="error" />
                                                </div>
                                                <button type="submit" className="btn" disabled={isSubmitting}>
                                                        Register
                                                </button>
                                        </Form>
                                )}
                        </Formik>
                </div>
        );
};

export default Register;
