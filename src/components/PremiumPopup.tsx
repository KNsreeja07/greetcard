import { X, Crown, Check, Zap, Star } from 'lucide-react';
import { upgradeToPremium } from '../utils/auth';

interface PremiumPopupProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const FEATURES = [
  'Unlock all premium templates',
  'No watermarks on shared images',
  'Priority new designs every week',
  'Exclusive festival collections',
  'HD quality downloads',
];

export default function PremiumPopup({ onClose, onUpgrade }: PremiumPopupProps) {
  function handleUpgrade() {
    upgradeToPremium();
    onUpgrade();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 px-6 pt-8 pb-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-3">
            <Crown className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Go Premium</h2>
          <p className="text-white/80 text-sm mt-1">Unlock all exclusive templates</p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-white fill-white" />
            ))}
            <span className="text-white/80 text-xs ml-1">4.9 · 10k+ users</span>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 py-5">
          <ul className="space-y-3 mb-5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-700">{f}</span>
              </li>
            ))}
          </ul>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-4 text-center">
            <div className="flex items-end justify-center gap-1">
              <span className="text-3xl font-bold text-gray-900">$4.99</span>
              <span className="text-gray-500 text-sm mb-1">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Cancel anytime · No hidden fees</p>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:from-amber-500 hover:to-orange-500 transition-all shadow-md hover:shadow-lg"
          >
            <Zap className="w-4 h-4" />
            Upgrade Now — $4.99/mo
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-400 text-sm py-3 hover:text-gray-600 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
