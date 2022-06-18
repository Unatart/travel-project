import * as React from 'react';
import './App.css';
import {Background} from "./ui-kit/background/Background";
import {MainPage} from "./components/main/MainPage";
import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import {TourPage} from "./components/tour/TourPage";
import {NavBar} from "./ui-kit/navbar/NavBar";
import {IPopupService, PopupService} from "./popup_service/PopupService";

interface IAppContext {
    popup_service:IPopupService;
}

const popup_service = new PopupService();
export const AppContext = React.createContext<IAppContext>({ popup_service });

function App() {
    const [Popup, setPopup] = React.useState<React.ReactNode | null>(null);

    React.useEffect(() => {
        const listener = [] as const;
        popup_service.onUpdate().listen(listener).on(() => {
            setPopup(popup_service.getCurrentPopup());
        });

        return () => {
            popup_service.onUpdate().off();
        }
    }, []);

    return (
        <div className="app">
            <AppContext.Provider value={{ popup_service }}>
                <>
                    <Background/>
                    <Router>
                        <NavBar items={["main", "tours", "reviews", "contacts", "authorize"]}/>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/tours" element={<TourPage/>}/>
                            <Route path="/reviews"/>
                            <Route path="/authorize"/>
                        </Routes>
                    </Router>
                    {Popup}
                </>
            </AppContext.Provider>
        </div>
    );
}

export default App;

