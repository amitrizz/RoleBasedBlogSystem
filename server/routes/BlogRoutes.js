import express from 'express';
const router = express.Router();
import BlogController from '../controllers/BlogController.js';
import checkUserAuthentication from '../middleware/auth-checkAuthentication.js'



//public routes
router.get('/bloglist',checkUserAuthentication, BlogController.blogList);
router.get('/detail-blog/:id',checkUserAuthentication, BlogController.detailBlog);

router.get('/draft-blog',checkUserAuthentication, BlogController.draftBlog);
router.post('/save-draft-blog',checkUserAuthentication, BlogController.saveDraftBlog);
router.put('/save-blog/:id', checkUserAuthentication,BlogController.saveBlog);
router.delete('/delete-blog/:id', checkUserAuthentication,BlogController.deleteBlog);




export default router;