import { registerRootComponent } from 'expo';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

function AppWrapper() {
    return (
        <AuthProvider>
            <TaskProvider>
                <App />
            </TaskProvider>
        </AuthProvider>
    )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
registerRootComponent(AppWrapper);
