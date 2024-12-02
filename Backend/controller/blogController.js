const User = require('../model/user');
const Blog = require('../model/bloge');
const Tag = require('../model/tag');
const Category = require('../model/category');

const createBlog = async (req, res) => {
    const { title, content, category, tags, status, publishedAt } = req.body;
  
    try {
      if (!title || !content || !category || !status) {
        return res.status(400).json({ msg: 'Title, content, category, and status are required.' });
      }
  
      const authorId = req.user?.id; // Assuming req.user is populated via middleware
      if (!authorId) {
        return res.status(401).json({ msg: 'Unauthorized. Please log in.' });
      }
  
      const categoryData = await Category.findById(category);
      if (!categoryData) {
        return res.status(400).json({ msg: 'Invalid category.' });
      }
  
      let tagsData = [];
      if (tags && tags.length) {
        tagsData = await Tag.find({ _id: { $in: tags } });
        if (tagsData.length !== tags.length) {
          return res.status(400).json({ msg: 'One or more invalid tags provided.' });
        }
      }
  
      const coverImage = req.file?.filename || null;
  
      const blog = new Blog({
        title,
        content,
        category: categoryData._id,
        tags: tagsData.map((tag) => tag._id),
        author: authorId,
        coverImage,
        status,
        publishedAt: status === 'published' ? publishedAt || new Date() : null,
      });
  
      const savedBlog = await blog.save();
      return res.status(201).json({ msg: 'Blog created successfully.', blog: savedBlog });
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ msg: 'Server error. Blog creation failed.' });
    }
  };
  


module.exports = {createBlog};