import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('Blogform calls event handler when new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'React testing' },
    })
    fireEvent.change(authorInput, {
      target: { value: 'Admin' },
    })
    fireEvent.change(urlInput, {
      target: { value: 'www.hello.com' },
    })

    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('React testing')
    expect(createBlog.mock.calls[0][0].author).toBe('Admin')
    expect(createBlog.mock.calls[0][0].url).toBe('www.hello.com')
  })
})