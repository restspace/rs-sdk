import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { EditBlog } from './components/EditBlog';
import { Blog } from './components/Blog';
import { QueryClient, QueryClientProvider } from "react-query";
import { ViewBlog } from './components/ViewBlog';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/create">Create Blog</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/view/:postDate">
            <ViewBlog />
          </Route>
          <Route path="/create">
            <EditBlog />
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
