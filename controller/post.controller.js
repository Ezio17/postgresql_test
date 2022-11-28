const db = require("../bd");

class PostController {
  async createPost(req, res) {
    const { title, content, userId } = req.body;

    const post = await db.query(
      "INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );

    res.json(post.rows[0]);
  };

  async getPostsByUser(req, res) {
    const { userId } = req.query;

    const getAllUserPosts = await db.query(
      "SELECT * FROM post where user_id = $1",
      [userId]
    ); 
  
    res.json(getAllUserPosts.rows);
  }

  async updatePostContent(req, res) {
    const {id, content} = req.body;

    const post = await db.query('UPDATE post set content = $1 where id = $2 RETURNING *', [content, id]);

    res.json(post.rows[0]);
  }
}

module.exports = new PostController();
