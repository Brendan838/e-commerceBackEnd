const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

 const allTags = await Tag.findAll({
   include: [{model: Product}]
  });

  res.json(allTags)

});
  
  




router.get('/:id', async (req, res) => {
  const tagId = req.params.id
  const oneTag = await Tag.findOne({
   include: [{model: Product}],
    where: {
  id: tagId
  }
  });
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  res.json(oneTag)
});

router.post('/', async (req, res) => {
  const newTag = req.body.tag_name
  await Tag.create({tag_name: newTag})

  res.json("New tag added!")

});


router.put('/:id', async (req, res) => {
  const tagId = req.params.id;
  const updatedTag = req.body.tag_name;
  await Tag.update({tag_name: updatedTag}, {
  where: {
  id: tagId
  }
  });
  res.json("Tag updated!")// update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  const tagId = req.params.id;
  
  await Tag.destroy({
  where: {
  id: tagId
  }
  });

   res.json("Tag deleted!!")
});

module.exports = router;
