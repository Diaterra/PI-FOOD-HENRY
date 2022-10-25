const {Router}= require ('express');
const {getAlldiets} = require('../controllers/diets');


const router = Router();

router.get('/', async (req,res)=>{
    try {
      const diets = await getAlldiets()
      res.status(200).json(diets)
    } catch (error) {
       return res.status(400).send('Found error') 
    }
   
})



module.exports = router;