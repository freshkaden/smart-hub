import { useState, useEffect } from 'react';

function News({searchQuery}){
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		
		const fetchNews = async () => {
			// get news api key from .env file
			const news_api_key = import.meta.env.VITE_NEWS_API_KEY;
			const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${news_api_key}`

			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error("Error: cant connect to news api");

				const data = await response.json();
				setArticles(data.articles || []);
			}	catch (err) {
				setError(err.message);
			}	finally {
				setLoading(false);
			}
		};

		// call function
		fetchNews();
	}, []);

	const filteredArticles = articles.filter((article) => {
		// if no search, show all articles by default
		if (!searchQuery) return true;

		const query = searchQuery.toLowerCase();
		const title = article.title ? article.title.toLowerCase() : "";

		return title.includes(query);
	});

	// error handling
	if (loading) return <p className="p-4">Loading news</p>;
	if (error) return <p className="p-4">Error: {error}</p>;
	
	// display the news on the website
	return (
		<div className="news-container">
			<h2 className="news-title">Today's Top Headlines</h2>
			<div className="news-list">
				{filteredArticles.length > 0 ? (
					filteredArticles.map((article, index) => (
						<div key={index} className="news-story">
						<a href={article.url} target="_blank" rel="noreferrer" className="news-link">{article.title}</a>
						</div>
					))
				) : (
					<p className="news-empty">Searching... No matching headlines found.</p>
				)}
				</div>
				</div>
	);
}










export default News;
