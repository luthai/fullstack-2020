import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBlogReducer } from '../Reducers/blogReducer';

const BlogForm = (props) => {
  const addNewBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    props.createBlogReducer({
      title, author, url,
    });
  };

  return (
    <Form className="row-m-blogform" onSubmit={addNewBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          name="text"
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          id="author"
          type="text"
          name="author"
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          id="url"
          type="text"
          name="url"
        />
      </Form.Group>
      <Button id="create-btn" type="submit">create</Button>
    </Form>
  );
};

BlogForm.propTypes = {
  createBlogReducer: PropTypes.func.isRequired,
};

export default connect(null, { createBlogReducer })(BlogForm);
