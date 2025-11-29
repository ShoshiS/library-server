import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    cb(null, `product${Date.now()}${fileExtension}`);
  }
})

export const upload = multer({ 
  storage: storage ,  
  limits: { fieldSize: 1024 * 1024 }
});