import RoutesApp from './routes.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <div className="App">
            <ToastContainer />
            <RoutesApp />
        </div>
    )
}

export default App