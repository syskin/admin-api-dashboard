import Entities from './index'
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Home page', () => {
  it('Mount component without crashing with authentication', () => {
    process.env.REACT_APP_AUTHENTICATION = 'true'
    render(
      <Router>
        <Entities />
      </Router>
    )
    expect(screen.getByText('Entities page')).toBeInTheDocument()
  })
})
