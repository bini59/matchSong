var express = require('express');
var router = express.Router();

router.post('/', (req, res)=>{
    console.log(room)
    res.json(JSON.stringify(room))
})

router.post('/add', function(req, res, next) {
    room.rooms.push(req.body);
    console.log(room)
    res.json(JSON.stringify(room))
});



module.exports = router;
