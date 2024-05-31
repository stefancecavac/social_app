import {getAllPosts , createPost} from '../controllers/postController.js'
import * as db from '../db/index.js'


jest.mock('../db/index.js')

describe('getAllPosts', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 404 if no posts are found', async () => {
    db.query.mockResolvedValue({ rows: [] });

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No posts found' });
  });


  it('should return 200 if posts are found' , async() => {
    const mocks = [{ post_id: '1' , contet: 'post 1'} , { post_id: '2' , contet: 'post 2'}]
    db.query.mockResolvedValue({rows : mocks})

    await getAllPosts(req, res)

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mocks);
  })

  it('should return 500 if there is server error' , async() => {
    db.query.mockRejectedValue(new Error('Database error'));
      
    await getAllPosts(req, res) 

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({message:'something went wrong getting posts'})
  })
});


describe('createPost', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body:{}};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if fields empty', async () => {
    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please fill out all fields' });
  });


  it('should return 201 if post is created' , async() => {
    const mock = {post_id: 1 , content: 'post 1'}
    req.body.content = 'post 1';
    db.query.mockResolvedValue({rows: [mock]})

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mock);
  })

  it(`should return 500 if there is server error` , async() => {
    req.body.content = 'New post';
    db.query.mockRejectedValue(new Error('Database error'))

    await createPost(req, res)

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({message:'something went wrong creating post'});
  })
});
