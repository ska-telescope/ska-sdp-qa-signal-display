// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/index'

describe("Home", () => {
  it("renders", () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Welcome to QA Metrics Visualization Dashboard!/i,
    })

    expect(heading).toBeInTheDocument();
  });
});