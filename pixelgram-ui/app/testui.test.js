import React from 'react'
import Enzyme, { shallow,mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux";
import store from "./src/store/store";
import configureStore from 'redux-mock-store';
import { BrowserRouter } from "react-router-dom";


/* Components */
import LearnMore from "./src/components/pages/LearnMore"
import LoginSignup from "./src/components/pages/LoginSignup"
import HomePage from "./src/components/pages/HomePage"

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })
const mockStore = configureStore([]);

describe('LearnMore Component', () => {
  it('checking number of paragraphs', () => {
    const wrapper = shallow(<LearnMore></LearnMore>)
    const paragraph = wrapper.find('p')
    expect(paragraph).toHaveLength(4)
    //expect(paragraph.text()).toEqual('This is my first test')
  })

  it('checking number of H1', () => {
    const wrapper = shallow(<LearnMore></LearnMore>)
    const paragraph = wrapper.find('h1')
    expect(paragraph).toHaveLength(1)
    expect(paragraph.text()).toEqual('PixelGram')
  })
})

describe('LoginSignup Component', () => {
    let store;
    store = mockStore({
      myState: 'sample text',
    });
   it('checking textFields', () => {
     const wrapper = mount(<BrowserRouter><Provider store={store}> <LoginSignup/> </Provider></BrowserRouter>)
     const itemtextfields = wrapper.find('input');
     expect(itemtextfields).toHaveLength(2);
     //console.log(item.at(0).text())
   });
   it('checking buttons', () => {
     const wrapper = mount(<BrowserRouter><Provider store={store}> <LoginSignup/> </Provider></BrowserRouter>)
     const itembuttons = wrapper.find('button');
     //console.log(item.at(0).text())
     expect(itembuttons).toHaveLength(2);
     expect(itembuttons.at(0).text()).toEqual('Login')
     expect(itembuttons.at(1).text()).toEqual('New User ? Signup')
   });
});









