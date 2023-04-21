const product = require("../models/product");

const getAllProducts = async (req, res) => {

    const {name, company, featured, sort, select} = req.query;
    const queryObject = {};
    
    if (name) {
        queryObject.name = {$regex: name, $options: "i"};
    }

    if (company) {
        queryObject.company = {$regex: company, $options: "i"};
    }
    
    if (featured) {
        queryObject.featured = {$regex: featured, $options: "i"};
    }

    let apiData = product.find(queryObject);

    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const Products = await apiData;
    res.status(200).json({Products, nbHits: Products.length});
};


const getAllProductsTesting = async (req, res) => {
    const Products = await product.find(req.query).select("name company");
    res.status(200).json({Products});
};

module.exports = {getAllProducts, getAllProductsTesting};