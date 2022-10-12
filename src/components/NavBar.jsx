import '../App.css';
import CartWidget from './CartWidget.jsx';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand brandName" to="/">
            CastelShoes
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to="/" className="nav-link  links">
                    Inicio
                </Link>
                </li>

                <li className="nav-item">
                <Link to="/category/1" className="nav-link links">
                    Nike
                </Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/category/2">
                    Jordan
                </Link>
                </li>

                <li className="nav-item">
                <Link to="/cart" className="noUnderline">
                    <button type="button" className="no-btn nav-link cartBtn">
                    <CartWidget />
                    </button>
                </Link>
                </li>
            </ul>
            <div className="d-flex gap-3" role="search"></div>
            </div>
        </div>
        </nav>
    );
}






export default Navbar;