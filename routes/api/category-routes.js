const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const categoryData = await Category.findAll({
			include: [{ model: Product }],
		});
		console.log(categoryData);
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const categoryData = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});

		if (!categoryData) {
			res.status(404).json({ message: 'No category found with that id!' });
			return;
		}

		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try {
		const newCategory = await Category.create(req.body);
		res.status(201).json(newCategory);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const updatedCategory = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		if (!updatedCategory[0]) {
			res.status(404).json({ message: 'No category with this id found' });
			return;
		}

		res.status(200).json({ message: 'Category updated successfully.' });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		// delete products associated with the category
		await Product.destroy({
			where: {
				category_id: req.params.id,
			},
		});

		// delete the category
		const deletedCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!deletedCategory) {
			res.status(404).json({ message: 'No category found with that id!' });
			return;
		}

		res.status(200).json({ message: 'Category and its associated products deleted successfully.' });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
