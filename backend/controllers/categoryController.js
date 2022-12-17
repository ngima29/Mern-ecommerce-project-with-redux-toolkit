const categoryModel = require('../Models/categoryModule')

exports.postCategory = async (req, res) => {

    let category = new categoryModel(req.body)
    categoryModel.findOne({ category_name: category.category_name }, async (error, data) => {
        if (data == null) {
            category = await category.save()
            if (!category)   return res.status(400).json({ error: 'something went wrong' })
            res.json({ category })
        }
        else
            return res.status(400).json({ error: 'category name must be unique' })
    })

}
//  to show all category list
exports.categoryList = async (req, res) => {
    const category = await categoryModel.find()
    if (!category)  return res.status(400).json({ error: 'something went wrong' })
    res.send(category)
}

// to show category details
exports.categoryDetails = async (req, res) => {
    const category = await categoryModel.findById(req.params.id)
    if (!category) return res.status(400).json({ error: 'something went wrong' })
    res.send(category)
}


//  to updata category

exports.updateCategory = async (req, res) => {
    const category = await categoryModel.findByIdAndUpdate(
        req.params.id,
        {
            category_name: req.body.category_name
        },
        { new: true }
    )
    if (!category) return res.status(400).json({ error: 'category name must be unique' })
    res.send(category)
}


// to delete category
exports.deleteCategory = (req, res) => {
    categoryModel.findByIdAndRemove(req.params.id).then(category => {
        if (!category)  return res.status(403).jsnon({ error: 'category not found' })
        
            return res.status(200).json({ message: 'category deleted' })
    })
        .catch(err => {
            return res.status(400).json({ err })
        })
}