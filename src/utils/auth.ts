export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  authMethod: 'google' | 'email' | 'guest';
  isPremium: boolean;
}

const STORAGE_KEY = 'greet_user';

export function getUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function createGuestUser(): UserProfile {
  return {
    id: `guest_${Date.now()}`,
    name: 'Guest',
    email: '',
    photo: null,
    authMethod: 'guest',
    isPremium: false,
  };
}

export function upgradeToPremium(): void {
  const user = getUser();
  if (user) {
    saveUser({ ...user, isPremium: true });
  }
}
