const handleDeleteAllCompleted = (req, res, db) => {
	// Empty completeditems table
	return db('completeditems').del().returning('*')
		.then(() => {
			// Select completed items table
			return db.select().from('completeditems')
				.then(completeditems => {
					// Send completed items table to the front end
					return res.json({completeditems: completeditems});
				});
		})
		.catch(() => res.status(400).json({errorMessage: 'Could not delete all completed items.', statusCode: res.status(400).statusCode}));
};

module.exports = {
	handleDeleteAllCompleted
};
