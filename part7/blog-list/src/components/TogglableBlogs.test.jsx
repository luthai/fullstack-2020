import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TogglableBlogs from './TogglableBlogs'

describe('<ToggleableBlogs />', () => {
  let component
  let blog
  let user

  beforeEach(() => {
    blog = {
      title: 'creating new blog test',
      author: 'Some guy',
      url: 'www.hello.com',
      likes: 17,
      user: {
        username: "admin",
        id: "123",
      }
    }

    user = {
      username: 'admin',
      password: 'hello'
    }

    component = render(
      <TogglableBlogs 
        buttonLabel="view..." 
        blog={blog} 
        user={user}
        updateBlog={() => {}}
        deleteBlog={() => {}}
        />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )

    const div = component.container.querySelector('.showMore')

    expect(div).toBe(null)
  })

  test('render the entire blog when user click view button', () => {
    let div = component.container.querySelector('.showLess')
    expect(div).not.toBe(null)
    
    const button = component.getByText('view...')
    fireEvent.click(button)
    
    div = component.container.querySelector('.showLess')
    expect(div).toBe(null)
  })

  test('clicking likes twice, event handler called twice', () => {
    const button = component.getByText('view...')
    fireEvent.click(button)

    let initLikes = 17
    let likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(`likes ${initLikes}`)

    let likeButton = component.getByText('like')
    for (let i = 0; i < 2; i++) {
      fireEvent.click(likeButton)
      likes = component.container.querySelector('.likes')
      initLikes += 1
      expect(likes).toHaveTextContent(`likes ${initLikes}`)
    }
  })
})