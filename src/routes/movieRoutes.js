const express = require('express');
const multer = require('multer');
const movieController = require('../controllers/movieController');
const router = express.Router();
const auth = require('../middleware/authMiddleware')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      cb(null, `${timestamp}.txt`);
    },
  });

  const upload = multer({ storage });


router.post('/', auth, movieController.create)
router.get('/', auth, movieController.list);
router.get('/:id', auth, movieController.show);
router.get('/find/title', movieController.getMovieByTitle);
router.get('/find/actor', movieController.getMoviesByActor);
router.delete('/:id', auth, movieController.delete);
router.post('/import', auth, upload.single('movies'), movieController.import);
router.patch('/:id', auth, movieController.update);

module.exports = router;
