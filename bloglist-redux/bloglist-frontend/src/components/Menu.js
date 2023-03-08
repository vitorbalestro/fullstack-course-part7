import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import DisplayUser from './User'

const Menu = ({ dispatch }) => {

    return (
        <div className='mt-5'>
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='light'>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="container-fluid">
                        <Nav.Link href="#" as="span">
                            <Link class="link" to="/blogs">blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link class="link" to="/users">users</Link>
                        </Nav.Link>
                        <Nav.Item className={['ms-auto','mt-2']}>
                            <DisplayUser dispatch={dispatch} />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Menu