import "./QuoteSection.css";

interface QuoteSectionProps {
	quote: {
		id: number;
		text: string;
		author: string;
	};
}

function QuoteSection({ quote }: QuoteSectionProps) {
	return (
		<section className="quote-section">
			<h2 className="quote-heading">Quote</h2>

			<div className="quote-content">
				<blockquote>{quote.text}</blockquote>
				<p className="quote-author">{quote.author}</p>
			</div>
		</section>
	);
}

export default QuoteSection;
