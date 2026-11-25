import { Link } from "react-router";
import logo from "../../assets/logo/logo-tastygo.svg";
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-brand">
					<div className="footer-logo">
						<Link to="/home">
							<img
								src={logo}
								alt="TASTYGO logo"
								onMouseEnter={(event) => {
									event.currentTarget.classList.remove("logo-spin");
									void event.currentTarget.offsetWidth;
									event.currentTarget.classList.add("logo-spin");
								}}
							/>
						</Link>
						<h2>TASTYGO</h2>
					</div>

					<p className="footer-description">
						A culinary journey through cultures, recipes, and flavors from
						around the world.
					</p>
				</div>

				<nav className="footer-nav" aria-label="Footer navigation">
					<Link to="/all-recipes">All recipes</Link>
					<Link to="/favorites">Favorites</Link>
					<Link to="/discover">Discover</Link>
					<Link to="/my-list">My list</Link>
				</nav>
			</div>

			<div className="footer-bottom">
				<p>© 2026 TASTYGO. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
