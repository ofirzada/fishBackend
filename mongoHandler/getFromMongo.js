module.exports.isUserOwnerOfAccount = (collection,user,accountId)=>{
    var findeObj = await collection.findOne({
        username: userName,
        accounts:accountId
      })
      console.log(findeObj)
    if (!findeObj==null) {
        return {'isAllowed':true}
    }  
    return false
}

