// __tests__/index.test.jsx

import { render } from '@testing-library/react'
import { Container } from '@mui/material';

describe("Home", () => {
  it("renders", () => {
    render(<Container />)
  });
});