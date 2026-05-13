import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Type, Share2, RefreshCw, Crown, Loader2, ImagePlus } from 'lucide-react';
import { Template } from '../data/templates';
import { UserProfile, saveUser } from '../utils/auth';
import ShareModal from './ShareModal';

interface ImageEditorProps {
  template: Template;
  user: UserProfile;
  onBack: () => void;
  onUserUpdate: (user: UserProfile) => void;
}

export default function ImageEditor({ template, user, onBack, onUserUpdate }: ImageEditorProps) {
  const [editName, setEditName] = useState(user.name);
  const [editPhoto, setEditPhoto] = useState<string | null>(user.photo);
  const [editingName, setEditingName] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bgImage, setBgImage] = useState<string>(template.image);

  const fileRef = useRef<HTMLInputElement>(null);
  const bgFileRef = useRef<HTMLInputElement>(null);

  const previewUser: UserProfile = { ...user, name: editName, photo: editPhoto };

  function handlePhotoChange(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setEditPhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleBgChange(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setBgImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSaveAndShare() {
    setSaving(true);
    const updated = { ...user, name: editName, photo: editPhoto };
    saveUser(updated);
    onUserUpdate(updated);
    setTimeout(() => {
      setSaving(false);
      setShowShare(true);
    }, 300);
  }

  function handleReset() {
    setEditName(user.name);
    setEditPhoto(user.photo);
    setBgImage(template.image);
    setEditingName(false);
  }

  const isCustomBg = bgImage !== template.image;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-gray-900/80 backdrop-blur-sm border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h2 className="text-white font-semibold text-sm">{template.title}</h2>
        {template.isPremium ? (
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">
            <Crown className="w-3 h-3" />
            PRO
          </div>
        ) : (
          <div className="w-12" />
        )}
      </header>

      {/* Change BG strip — prominent, right below header */}
      <div className="bg-gray-900/60 border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImagePlus className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium">
            {isCustomBg ? 'Custom background applied' : 'Using template background'}
          </span>
          {isCustomBg && (
            <span className="bg-rose-500/20 text-rose-300 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              CUSTOM
            </span>
          )}
        </div>
        <button
          onClick={() => bgFileRef.current?.click()}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
        >
          <ImagePlus className="w-3.5 h-3.5" />
          Change BG
        </button>
      </div>

      {/* Canvas Preview */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={bgImage}
            alt={template.title}
            className="w-full h-full object-cover transition-all duration-300"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Photo + Name — top left */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="w-12 h-12 rounded-full border-2 border-white/80 shadow-xl overflow-hidden bg-white/20 flex-shrink-0">
              {editPhoto ? (
                <img src={editPhoto} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/30">
                  <span className="text-white font-bold text-lg">
                    {editName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <p
              className="font-bold text-base drop-shadow-lg max-w-[140px] truncate"
              style={{ color: template.textColor, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
            >
              {editName}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Controls */}
      <div className="bg-gray-900 border-t border-white/10 px-4 pt-4 pb-6">
        {editingName ? (
          <div className="mb-4">
            <div className="flex items-center gap-2 bg-gray-800 rounded-2xl px-4 py-2 border border-gray-700 focus-within:border-rose-400 transition-colors">
              <Type className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={30}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
                placeholder="Your name"
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
              />
              <span className="text-gray-500 text-xs">{editName.length}/30</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Camera className="w-5 h-5 text-gray-300" />
              <span className="text-xs text-gray-400 font-medium">Change Photo</span>
            </button>
            <button
              onClick={() => setEditingName(true)}
              className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Type className="w-5 h-5 text-gray-300" />
              <span className="text-xs text-gray-400 font-medium">Edit Name</span>
            </button>
            <button
              onClick={handleReset}
              className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-300" />
              <span className="text-xs text-gray-400 font-medium">Reset</span>
            </button>
          </div>
        )}

        <button
          onClick={handleSaveAndShare}
          disabled={saving || !editName.trim()}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-orange-400 text-white py-3.5 rounded-2xl font-bold text-sm hover:from-rose-500 hover:to-orange-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
          {saving ? 'Preparing...' : 'Share This Card'}
        </button>
      </div>

      {/* Profile photo file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handlePhotoChange(e.target.files[0])}
      />

      {/* Background image file input */}
      <input
        ref={bgFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleBgChange(e.target.files[0])}
      />

      {showShare && (
        <ShareModal
          template={template}
          user={previewUser}
          bgImage={bgImage}  
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}