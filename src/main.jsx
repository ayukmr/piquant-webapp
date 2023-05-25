import React    from 'react';
import ReactDOM from 'react-dom/client';

import axios   from 'axios';
import Cookies from 'js-cookie';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, Route
} from 'react-router-dom';

import Root          from './Root';
import ErrorBoundary from './ErrorBoundary';

import {
  Home,
  About, Api, Contact,
  Create, Login,
  Settings, Bookmarks
} from './routes';

import './styles/main.less';

// create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorBoundary />}
    >
      {/* homepage */}
      <Route path="/" element={<Home />}    />

      {/* info pages */}
      <Route path="about"   element={<About />}   />
      <Route path="api"     element={<Api />}     />
      <Route path="contact" element={<Contact />} />

      {/* user pages */}
      <Route path="create"   element={<Create />}   />
      <Route path="login"    element={<Login />}    />
      <Route path="settings" element={<Settings />} />

      {/* bookmarks */}
      <Route
        path="bookmarks"
        element={
          <Bookmarks
            title="all bookmarks"
            loader={() => {
              const token = Cookies.get('token');

              if (token) {
                // get all bookmarks
                return axios.get(
                  'http://localhost:9292/bookmarks',
                  { headers: { Authorization: `Bearer ${token}` } }
                );
              } else {
                window.location = '/login';
              }
            }}
          />
        }
      />

      {/* tagged bookmarks */}
      <Route
        path="bookmarks/tag/:tag"
        element={
          <Bookmarks
            title="tagged bookmarks"
            loader={() => {
              const tag   = location.pathname.match(/\/bookmarks\/tag\/([^/]*)/)[1];
              const token = Cookies.get('token');

              if (token) {
                // get bookmarks with tag
                return axios.get(
                  `http://localhost:9292/bookmarks/tag/${tag}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
              } else {
                window.location = '/login';
              }
            }}
          />
        }
      />
    </Route>
  )
);

// render router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
