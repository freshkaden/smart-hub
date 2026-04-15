function Search({ searchQuery, setSearchQuery}) {
	return (
		<div className="search-container">
			<input
				className="dashboard-search-input"
				type="text"
				placeholder="Search news or local tasks right here!"
	
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				/>
		</div>
	);
}

export default Search;