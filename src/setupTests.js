import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

configure({ adapter: new Adapter() });

jest.mock(`react-i18next`, () => ({
  useTranslation: () => ({
    t: str => str
  })
}));
