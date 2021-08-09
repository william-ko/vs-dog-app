import { FunctionComponent } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export const Navigation: FunctionComponent = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Vetspire Dogs</Navbar.Brand>
            <Nav>
            <Nav.Link href="/upload" className="pull-right">Create A Dog Profile!</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    );
}