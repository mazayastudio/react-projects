export default function Lists() {

	return (
		<div className='list'>
			<ul>
				{sortedItems.map((item, index) => (
					<li key={item.id || index}>
						<input type='checkbox' />
						<span>{item.description}</span>
						<button>❌</button>
					</li>
				))}
			</ul>

			<div className='actions'>
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value='input'>Sort by input order</option>
					<option value='description'>Sort by description</option>
					<option value='packed'>Sort by packed status</option>
				</select>
				<button>Clear list</button>
			</div>
		</div>
	);
}
