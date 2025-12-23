const  PROTECTED_PATHS =['/dashboard','/schedule-films','/explore-films'];
module.exports =  async function pageAuth(req,res,next){
    const isProtectedPath = PROTECTED_PATHS.some(pathname =>  req.path.startsWith(pathname))
    if(isProtectedPath){
        const serverRes = await fetch(`${req.protocol}://${req.get('host')}/backend/api/users/authenticate`,{
            headers:{
                cookie: req.headers.cookie
            }
        })
        if(serverRes.status !== 200){
            return res.redirect('/')
        }
    }
    return next();
}