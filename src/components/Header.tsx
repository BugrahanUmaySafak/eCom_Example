import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/stores/store';
import { searchProducts } from '../redux/slices/productSlice';
import { Badge, Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { CiShoppingBasket } from "react-icons/ci";
import '../css/Header.css';

const Header: React.FC = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const dispatch: AppDispatch = useDispatch();

        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
        };

        const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                dispatch(searchProducts(searchTerm));
        };

        return (
                <header className="header">
                        <Navbar expand="lg" className="custom-navbar">
                                <Container>
                                        <Navbar.Brand as={Link} to="/" className="headerContainer">
                                                <h1 className="headerLogo">
                                                        <span>Our</span> <Badge bg="info">eCom</Badge>
                                                </h1>
                                        </Navbar.Brand>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse id="basic-navbar-nav">
                                                <Nav className="me-auto">
                                                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                                                </Nav>
                                                <Form className="d-flex search-form" onSubmit={handleSearchSubmit}>
                                                        <FormControl
                                                                type="search"
                                                                placeholder="Search"
                                                                className="me-2 form-control-sm"
                                                                aria-label="Search"
                                                                value={searchTerm}
                                                                onChange={handleSearchChange}
                                                        />
                                                        <Button variant="outline-info" className="btn-sm" type="submit">Search</Button>
                                                </Form>
                                                <Nav>
                                                        <Nav.Link as={Link} to="/login" className="nav-item login-btn">Login</Nav.Link>
                                                        <Nav.Link as={Link} to="/register" className="nav-item register-btn">Register</Nav.Link>
                                                        <Badge>
                                                                <CiShoppingBasket className='basket-icon' />
                                                        </Badge>
                                                </Nav>
                                        </Navbar.Collapse>
                                </Container>
                        </Navbar>
                </header>
        );
}

export default Header;
