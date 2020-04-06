import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import "jest-localstorage-mock";

import {
  setPosts,
  startSetPosts,
} from "../../actions/posts";
import posts from "../fixtures/posts";

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  moxios.install();
  const auth = {
    token: "123abc456xyz"
  };
  localStorage.clear();
  localStorage.setItem("auth", JSON.stringify(auth));
});

afterEach(() => {
  moxios.uninstall();
});

test("should set up setPosts object", () => {
  const action = setPosts(posts);
  expect(action).toEqual({
    type: "SET_POSTS",
    posts
  });
});

test("should  call setPosts if no errors", done => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: { posts }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startSetPosts()).then(() => {
    const expectedActions = {
      type: "SET_POSTS",
      posts
    };
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});

test("should not call setPosts if there are errors", done => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { error: "Post could not be retrieved." }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startSetPosts()).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});