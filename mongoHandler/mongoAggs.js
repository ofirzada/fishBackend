module.exports.userProducts = function (userName) {
    return [
    { $match: { username: userName } },
    {
      $lookup: {
        from: "accounts",
        localField: "accounts",
        foreignField: "account_id",

        pipeline: [{ $limit: 10 }],
        as: "accountsData",
      },
    },
    { $unwind: { path: "$accountsData" } },
    { $unwind: { path: "$accountsData.products" } },
    {
      $group: {
        _id: "$accountsData.products",
        count: { $count: {} },
      },
    },
  ];
}

