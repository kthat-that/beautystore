

const getAll = (req, res)=>{
    res.redirect('/Homepage');
}

// const getHomepage = (req, res)=>{
//     res.render('pages/Homepage');
// }

const threeCEget = (req, res)=>{
    res.render('pages/3CE')
}

const aboutEget = (req, res)=>{
    res.render('pages/about')
}
 
const aunaget = (req, res)=>{
    res.render('pages/Auna');
}

const beautyget = (req, res)=>{
    res.render('pages/Beauty');
}

const contactget = (req, res)=>{
    res.render('pages/Contact');
}

const numbozinget = (req, res)=>{
    res.render('pages/Numbozin');
}

const phkaget = (req, res)=>{
    res.render('pages/Phka');
}

const skin1004get = (req, res)=>{
    res.render('pages/Skin1004');
}

const skincareget = (req, res)=>{
    res.render('pages/Skincare');
}

const detailsget = (req, res)=>{
    res.render('pages/details');
}

module.exports ={
    getAll,
    // getHomepage,
    threeCEget,
    aboutEget,
    aunaget,
    beautyget,
    contactget,
    numbozinget,
    phkaget,
    skin1004get,
    skincareget,
    detailsget

}