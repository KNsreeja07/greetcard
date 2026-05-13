import { useState } from 'react';
import { X, Download, Share2, MessageCircle, Mail, Copy, Check, Loader2 } from 'lucide-react';
import { Template } from '../data/templates';
import { UserProfile } from '../utils/auth';
import { composeImage } from '../utils/imageComposer';

interface ShareModalProps {
  template: Template;
  user: UserProfile;
  onClose: () => void;
  bgImage?: string; 
}

export default function ShareModal({ template, user, onClose, bgImage }: ShareModalProps) {
  const [composedUrl, setComposedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

 
  const previewImage = bgImage ?? template.image;

  async function getComposed() {
    if (composedUrl) return composedUrl;
    setLoading(true);
    setError('');
    try {
      const url = await composeImage({
        template,
        userName: user.name,
        userPhoto: user.photo,
        bgImage: previewImage, 
      });
      setComposedUrl(url);
      return url;
    } catch {
      setError('Failed to compose image. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    const url = await getComposed();
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}-greetcard.jpg`;
    a.click();
  }

  async function handleNativeShare() {
    const url = await getComposed();
    if (!url) return;
    if (navigator.share) {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const file = new File([blob], 'greetcard.jpg', { type: 'image/jpeg' });
        await navigator.share({
          title: `${template.title} Greeting`,
          text: `Check out this greeting from ${user.name}!`,
          files: [file],
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopy();
    }
  }

  async function handleWhatsApp() {
    const url = await getComposed();
    if (!url) return;
    const text = encodeURIComponent(`${template.title} greetings from ${user.name}! 🎉`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  async function handleEmail() {
    const subject = encodeURIComponent(`${template.title} Greetings from ${user.name}`);
    const body = encodeURIComponent(`Hi,\n\nI'm sending you warm ${template.title} greetings!\n\nWith love,\n${user.name}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  async function handleCopy() {
    const url = await getComposed();
    if (!url) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch {
      await navigator.clipboard.writeText(`${template.title} greetings from ${user.name}!`);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h3 className="font-bold text-gray-900">Share Your Card</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview — always uses the active background */}
        <div className="mx-6 rounded-2xl overflow-hidden relative aspect-square bg-gray-100 mb-4">
          <img
            src={previewImage}
            alt={template.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Photo + Name — top left, matching ImageEditor */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-white/80 shadow-xl overflow-hidden bg-white/20 flex-shrink-0">
              {user.photo ? (
                <img src={user.photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/30">
                  <span className="text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <p
              className="font-bold text-sm drop-shadow-lg max-w-[120px] truncate"
              style={{ color: template.textColor, textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
            >
              {user.name}
            </p>
          </div>

          {loading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-xs text-center mb-3 px-6">{error}</p>}

        {/* Share options */}
        <div className="px-6 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleNativeShare}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-orange-400 text-white py-3 rounded-2xl font-semibold text-sm hover:from-rose-500 hover:to-orange-500 transition-all shadow-md disabled:opacity-60"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleWhatsApp}
              disabled={loading}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors disabled:opacity-60"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-xs font-medium text-green-700">WhatsApp</span>
            </button>
            <button
              onClick={handleEmail}
              disabled={loading}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-60"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Email</span>
            </button>
            <button
              onClick={handleCopy}
              disabled={loading}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
              <span className={`text-xs font-medium ${copied ? 'text-green-700' : 'text-gray-700'}`}>
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}