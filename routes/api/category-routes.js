const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async function(req, res) {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
  include: [{model: Product}]
  }

)

  res.json(allCategories)

});

router.get('/:id',async function (req, res) {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryID = req.params.id
  const oneCategory = await Category.findOne({
  include: [{model: Product}],
  where: {
  id: categoryID
  }
  }
  )

  res.json(oneCategory)

});

router.post('/', async (req, res) => {
  const newCategory = req.body.category_name
  await Category.create({category_name: newCategory})

  res.json("New category added!")
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryID = req.params.id;
  const categoryNewName = req.body.category_name;
  await Category.update({category_name: categoryNewName}, {
  where: {
  id: categoryID
  }
  });
  res.json("Category updated!")
});

router.delete('/:id', (req, res) => {
  const categoryID = req.params.id;
  Category.destroy({
  where: {
  id: categoryID
  }
  });
  res.json("Category deleted!")
});

module.exports = router;
