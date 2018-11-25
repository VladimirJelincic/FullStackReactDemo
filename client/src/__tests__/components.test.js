import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Main from '../components/Main';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Logout from '../components/Logout';

const mockStore = configureStore();
const INITIAL_STATE = {
  auth: {
    authenticated: '',
    errerrorMessage: ''
  },
  users: {
    usersList: [],
    errorMessage: ''
  }
};
let store;
describe('Testing components', () => {
  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });
  configure({ adapter: new Adapter() });

  describe('Main component', () => {
    it('renders title', () => {
      const wrapper = shallow(<Main />);
      const title = <h3>Full Stack React Demo</h3>;
      // expect(wrapper.contains(welcome)).toBe(true);
      expect(wrapper.contains(title)).toEqual(true);
    });
  });

  describe('Login component', () => {
    it('renders properly', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Login />
        </Provider>
      );
      const title = <h4>Login</h4>;
      expect(wrapper.contains(title)).toEqual(true);
    });
  });
  describe('Signup component', () => {
    it('renders properly', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Signup />
        </Provider>
      );
      const title = <h4>Signup</h4>;
      expect(wrapper.contains(title)).toEqual(true);
    });
  });
  describe('Logout component', () => {
    it('renders properly', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Logout />
        </Provider>
      );
      const title = <h4>Bye....</h4>;
      expect(wrapper.contains(title)).toEqual(true);
    });
  });
});
