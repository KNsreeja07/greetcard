import { useState, useEffect } from 'react';
import { UserProfile, getUser } from './utils/auth';
import AuthPage from './components/AuthPage';
import ProfileSetup from './components/ProfileSetup';
import HomePage from './components/HomePage';

type Screen = 'auth' | 'profile-setup' | 'home';

function needsProfileSetup(user: UserProfile): boolean {
  return !user.name || user.name === 'Guest' || user.name === 'Google User';
}

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<Screen>('auth');

  useEffect(() => {
    const saved = getUser();
    if (saved) {
      setUser(saved);
      setScreen(needsProfileSetup(saved) ? 'profile-setup' : 'home');
    }
  }, []);

  function handleAuth(newUser: UserProfile) {
    setUser(newUser);
    setScreen(needsProfileSetup(newUser) ? 'profile-setup' : 'home');
  }

  function handleProfileComplete(updatedUser: UserProfile) {
    setUser(updatedUser);
    setScreen('home');
  }

  function handleLogout() {
    setUser(null);
    setScreen('auth');
  }

  function handleUserUpdate(updatedUser: UserProfile) {
    setUser(updatedUser);
  }

  if (screen === 'auth') {
    return <AuthPage onAuth={handleAuth} />;
  }

  if (screen === 'profile-setup' && user) {
    return <ProfileSetup user={user} onComplete={handleProfileComplete} />;
  }

  if (screen === 'home' && user) {
    return (
      <HomePage
        user={user}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />
    );
  }

  return null;
}
