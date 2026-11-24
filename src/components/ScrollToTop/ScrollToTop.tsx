import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTopOnMount() {
	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	}, []);

	return null;
}

function ScrollToTop() {
	const { pathname } = useLocation();

	return <ScrollToTopOnMount key={pathname} />;
}

export default ScrollToTop;
