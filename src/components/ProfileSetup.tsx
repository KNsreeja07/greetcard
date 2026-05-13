import { useState, useRef } from 'react';
import { Camera, User, ArrowRight, Sparkles } from 'lucide-react';
import { UserProfile, saveUser } from '../utils/auth';

interface ProfileSetupProps {
  user: UserProfile;
  onComplete: (user: UserProfile) => void;
}

export default function ProfileSetup({ user, onComplete }: ProfileSetupProps) {
  const [name, setName] = useState(user.name === 'Guest' ? '' : user.name);
  const [photo, setPhoto] = useState<string | null>(user.photo);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleContinue() {
    if (!name.trim()) return;
    const updated: UserProfile = { ...user, name: name.trim(), photo };
    saveUser(updated);
    onComplete(updated);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-400 to-orange-400 rounded-xl mb-3 shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Set Up Your Profile</h2>
          <p className="text-gray-500 text-sm mt-1">Your photo and name will appear on every card</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          {/* Photo upload */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative w-28 h-28 rounded-full cursor-pointer transition-all duration-200 ${
                dragging ? 'scale-105 ring-4 ring-rose-300' : 'hover:scale-105'
              }`}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-9 h-9 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Tap to upload or drag & drop</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={30}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{name.length}/30</p>
          </div>

          {/* Preview hint */}
          {(name || photo) && (
            <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-4 flex items-center gap-3">
              {photo ? (
                <img src={photo} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-orange-200 flex items-center justify-center text-rose-600 font-bold text-lg border-2 border-white shadow">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400">Preview</p>
                <p className="text-sm font-semibold text-gray-800">{name || 'Your Name'}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-rose-400 to-orange-400 text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:from-rose-500 hover:to-orange-500 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Templates
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onComplete({ ...user, name: user.name || 'User' })}
            className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors py-1"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
