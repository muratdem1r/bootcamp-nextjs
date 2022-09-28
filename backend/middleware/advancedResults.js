const advacedResults = (model, populate) => async (req, res, next) => {
  // reference@ https://docs.mongodb.com/manual/reference/operator/query-comparison/
  // console.log(req.query);

  let query;

  // Copy req.query
  const reqQuery = { ...req.query };
  // console.log(reqQuery);

  //Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  // console.log(reqQuery);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators like ($gt, $gte, $lt, $lte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  // console.log(queryStr);

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select fields
  // reference@ https://mongoosejs.com/docs/queries.html
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    // console.log(fields);
    query = query.select(fields);
  }

  // Sort
  // reference@ https://mongoosejs.com/docs/queries.html scroll down
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    // console.log(query);
  } else {
    query = query.sort('-createdAt');
    // console.log(query);
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(); // countDocumentations is a mongoose method

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination: pagination,
    data: results,
  };
  next();
};

module.exports = advacedResults;
