import * as React from 'react';
import './App.css';
import {Background} from "./ui-kit/background/Background";
import {MainPage} from "./components/main/MainPage";
import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import {VoyagePage} from "./components/voyage/VoyagePage";
import {NavBar} from "./ui-kit/navbar/NavBar";

function App() {
    return (
        <div className="app">
            <Background/>
            <Router>
                <NavBar items={["main", "tours", "reviews", "contacts", "authorize"]}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/tours" element={<VoyagePage/>}/>
                    <Route path="/result"/>
                    <Route path="/auth"/>
                </Routes>
                {/*<AuthorizePage/>*/}
                {/*<VoyagePage/>*/}
                {/*<ResultPage/>*/}
            </Router>
        </div>
    );
}

export default App;

