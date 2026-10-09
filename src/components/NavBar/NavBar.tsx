import { Link } from "react-router";
import logo from "../../assets/logo/logo-tastygo.svg";
import "./Navbar.css";
import type { NavBarProps } from "../../types/types";

function NavBar({ recipeUser }: NavBarProps) {
	return (
		<nav>
			<div className="logo-tastygo">
				<Link to={"/home"}>
					<img
						src={logo}
						alt="logo"
						onMouseEnter={(event) => {
							event.currentTarget.classList.remove("logo-spin");
							void event.currentTarget.offsetWidth;
							event.currentTarget.classList.add("logo-spin");
						}}
					/>
				</Link>
				<h2>TASTYGO</h2>
			</div>
			<input
				type="text"
				placeholder="Search"
				onChange={(event) => {
					recipeUser(event.target.value);
				}}
			/>
			<div className="ul-links">
				<ul>
					<li>
						<Link to={"/favorites"} className="btn btn-primary">
							Favorite
						</Link>
					</li>
					<li>
						<Link to={"/discover"} className="btn btn-primary">
							Discover
						</Link>
					</li>
					<li>
						<Link to={"/my-list"} className="btn btn-primary">
							My List
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
