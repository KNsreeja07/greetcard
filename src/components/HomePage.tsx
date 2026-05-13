import { useState } from 'react';
import { Search, Gift, LogOut, User, Crown, ChevronRight, Bell } from 'lucide-react';
import { TEMPLATES, CATEGORIES, Category } from '../data/templates';
import { UserProfile, logoutUser } from '../utils/auth';
import { Template } from '../data/templates';
import TemplateCard from './TemplateCard';
import PremiumPopup from './PremiumPopup';
import ImageEditor from './ImageEditor';

interface HomePageProps {
  user: UserProfile;
  onLogout: () => void;
  onUserUpdate: (user: UserProfile) => void;
}

export default function HomePage({ user, onLogout, onUserUpdate }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');
  const [showPremium, setShowPremium] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleTemplateClick(template: Template) {
    if (template.isPremium && !user.isPremium) {
      setShowPremium(true);
    } else {
      setSelectedTemplate(template);
    }
  }

  function handleUpgrade() {
    onUserUpdate({ ...user, isPremium: true });
    setShowPremium(false);
  }

  function handleLogout() {
    logoutUser();
    onLogout();
  }

  if (selectedTemplate) {
    return (
      <ImageEditor
        template={selectedTemplate}
        user={user}
        onBack={() => setSelectedTemplate(null)}
        onUserUpdate={onUserUpdate}
      />
    );
  }

  const freeCnt = TEMPLATES.filter((t) => !t.isPremium).length;
  const premiumCnt = TEMPLATES.filter((t) => t.isPremium).length;

  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-orange-400 rounded-lg flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">GreetCard</span>
          </div>

          <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
            <Bell className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {user.photo ? (
                <img src={user.photo} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-gray-200" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-orange-300 flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {showProfile && (
              <div className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email || 'Guest user'}</p>
                  {user.isPremium && (
                    <span className="inline-flex items-center gap-1 mt-1 text-xs text-amber-600 font-semibold">
                      <Crown className="w-3 h-3" />Premium
                    </span>
                  )}
                </div>
                {!user.isPremium && (
                  <button
                    onClick={() => { setShowProfile(false); setShowPremium(true); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 transition-colors font-medium"
                  >
                    <Crown className="w-4 h-4" />
                    Upgrade to Premium
                  </button>
                )}
                <button
                  onClick={() => { setShowProfile(false); handleLogout(); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-10">
        
        <div className="mt-5 mb-4">
          <div className="bg-gradient-to-r from-rose-400 to-orange-400 rounded-3xl p-5 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Welcome back,</p>
                <h1 className="text-xl font-bold mt-0.5">{user.name} 👋</h1>
                <p className="text-white/70 text-xs mt-1">Pick a template & personalize it</p>
              </div>
              <div className="text-right">
                <div className="flex gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{freeCnt}</p>
                    <p className="text-white/70 text-xs">Free</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{premiumCnt}</p>
                    <p className="text-white/70 text-xs">Premium</p>
                  </div>
                </div>
              </div>
            </div>

            {!user.isPremium && (
              <button
                onClick={() => setShowPremium(true)}
                className="mt-3 flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-3 py-2 text-sm font-semibold w-full"
              >
                <Crown className="w-4 h-4 text-yellow-200" />
                <span className="flex-1 text-left">Unlock all premium templates</span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            )}
          </div>
        </div>

        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition shadow-sm"
          />
        </div>

        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-5">
          {(['All', ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-rose-400 to-orange-400 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>


        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{filtered.length}</span> templates
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
          {!user.isPremium && (
            <button
              onClick={() => setShowPremium(true)}
              className="text-xs text-amber-600 font-semibold flex items-center gap-1 hover:text-amber-700 transition-colors"
            >
              <Crown className="w-3 h-3" />
              Unlock Premium
            </button>
          )}
        </div>

        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                user={user}
                onClick={() => handleTemplateClick(template)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No templates found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      
      {showProfile && (
        <div className="fixed inset-0 z-20" onClick={() => setShowProfile(false)} />
      )}

      {showPremium && (
        <PremiumPopup
          onClose={() => setShowPremium(false)}
          onUpgrade={handleUpgrade}
        />
      )}
    </div>
  );
}
