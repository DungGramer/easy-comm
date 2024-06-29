import { Route, Routes } from "react-router-dom";
import "./App.css";
import HandSignDetector from "./components/HandDetector";
import Body from "./components/ui/Body";
import Header from "./components/ui/Header";
import HandSignDetection from "./components/HandSignDetection";
import SpeechToASL from "./components/SpeechToASL";

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <section>
            <Header />
            <section className='mt-[80px]'>
              <Body />
            </section>
          </section>
        }
      />

      <Route path='hand-tracking' element={<HandSignDetector />} />
      <Route path="speech-to-asl" element={<SpeechToASL />} />
    </Routes>
  );
}

export default App;
