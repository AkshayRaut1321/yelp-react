import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Custom components
import RestaurantsList from './components/restaurants-list';
import AddReview from './components/add-review';
import Login from './components/login';
import Restaurant from './components/resturant';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Yelp MERN</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to={"/restaurants"} className="nav-link">
                  Restaurants
                </Link>
              </li>
              <li class="nav-item">
                {
                  user ? (
                    <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                      Logout {user.name}
                    </a>
                  ) : (
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    )
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route path="/restaurants/:id/review" render={(props) => {
            <AddReview {...props} user={user} />
          }} />
          <Route path="/restaurants/:id" render={(props) => {
            <Restaurant {...props} user={user} />
          }} />
          <Route path="/login" render={(props) => {
            <Login {...props} login={login} />
          }} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
