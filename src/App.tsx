import * as React from 'react';
import './App.css';
import {Background} from "./ui-kit/background/Background";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });

function App() {
  return (
      <div className="App">
          <Background/>
          <HistoryRouter history={history}>
              {/*<MainPage/>*/}
              {/*<AuthorizePage/>*/}
              {/*<VoyagePage/>*/}
              {/*<ResultPage/>*/}
          </HistoryRouter>,
      </div>
  );
}

export default App;

