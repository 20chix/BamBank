import { mount } from '@vue/test-utils'
import Auth from '@/components/Auth.vue'
import Vuex from "vuex";
import Vue from "vue";
import Vuetify from 'vuetify';

Vue.use(Vuex);

const givenMockActions = () => {
  return {
    signUp: jest.fn(),
    login: jest.fn()
  }
}

const createStore = (actions) => {
  return new Vuex.Store({
    actions
  })
}

const createMount = (store) => {
  return mount(Auth, {
    mocks: {
      $store: store
    },
    vuetify: new Vuetify(),
  })
}

jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnThis(),
  auth: function auth() {
      auth.Auth = jest.fn()
      return {
          createUserWithEmailAndPassword: (email, password) =>
              new Promise((res, rej) => jest.fn()),
      }
  }
}))

describe('Auth compoenent', () => {
  const actions = givenMockActions();
  const wrapper = createMount(createStore(actions))

  it('should render auth instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  })

  it('should contain login form', () => {
    expect(wrapper.find({ ref: "LoginTitle" })).toBeTruthy()
    expect(wrapper.find({ ref: "LoginEmailTextField" })).toBeTruthy()
    expect(wrapper.find({ ref: "LoginPasswordTextField" })).toBeTruthy()
    expect(wrapper.find({ ref: "LoginButton" })).toBeTruthy()
    expect(wrapper.find({ ref: "NewToBambankText" })).toBeTruthy()
  })

  it('should contain signup form', () => {
    expect(wrapper.find({ ref: "SignUpTitle" })).toBeTruthy()
    expect(wrapper.find({ ref: "SignUpEmailTextField" })).toBeTruthy()
    expect(wrapper.find({ ref: "SignUpPasswordTextField" })).toBeTruthy()
    expect(wrapper.find({ ref: "SignUpButton" })).toBeTruthy()
    expect(wrapper.find({ ref: "LoginToggleForm" })).toBeTruthy()
  })

  it('should signup user', async () => {
    const signup = jest.fn();
    wrapper.setMethods({ signup })

    const signUpButton = wrapper.find({ ref: "SignUpButton" })
    expect(signUpButton.text()).toBe("Sign up")
    expect(signup).toHaveBeenCalledTimes(0)
    signUpButton.trigger("click")
    await wrapper.vm.$nextTick()
    expect(signup).toHaveBeenCalledTimes(1)
  })

  it('should login user', async () => {
    const login = jest.fn();
    wrapper.setMethods({ login })

    const loginButtonForm = wrapper.find({ ref: "LoginToggleForm" })
    expect(loginButtonForm.text()).toBe("Login")
    expect(login).toHaveBeenCalledTimes(0)
    loginButtonForm.trigger("click")
    await wrapper.vm.$nextTick()

    // Login form visible
    const loginButton = wrapper.find({ ref: "LoginButton" })
    expect(loginButton.text()).toBe("Log in")
    expect(login).toHaveBeenCalledTimes(0)
    loginButton.trigger("click")
    await wrapper.vm.$nextTick()
    expect(login).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    jest.resetAllMocks()
    wrapper.destroy()
  });
});
