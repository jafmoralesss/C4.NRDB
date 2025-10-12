function authorizeManager(req,res,next){
    if (req.user && req.user.role === 'manager'){
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {authorizeManager};