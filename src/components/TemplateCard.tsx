import { Crown, Lock } from 'lucide-react';
import { Template } from '../data/templates';
import { UserProfile } from '../utils/auth';

interface TemplateCardProps {
  template: Template;
  user: UserProfile;
  onClick: () => void;
}

export default function TemplateCard({ template, user, onClick }: TemplateCardProps) {
  const isLocked = template.isPremium && !user.isPremium;

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square"
    >
      {/* Background image */}
      <img
        src={template.image}
        alt={template.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        crossOrigin="anonymous"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      
      <div className="absolute top-2 left-2 flex items-center gap-1.5">
        {/* Profile photo */}
        <div
          className="rounded-full border-2 border-white/80 shadow-lg overflow-hidden bg-white/20 flex-shrink-0"
          style={{ width: 32, height: 32 }}
        >
          {user.photo ? (
            <img src={user.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-bold text-white" style={{ fontSize: 13 }}>
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <p
          className="font-bold drop-shadow-lg truncate max-w-[80px]"
          style={{
            color: template.textColor,
            fontSize: 'clamp(9px, 2.5vw, 13px)',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          {user.name}
        </p>
      </div>

      {/* Template title */}
      <div className="absolute bottom-2 left-3 right-8">
        <p className="text-white text-xs font-semibold truncate drop-shadow">{template.title}</p>
      </div>

      {/* Premium badge */}
      {template.isPremium && (
        <div className="absolute top-2 right-2">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <Crown className="w-3 h-3" />
            PRO
          </div>
        </div>
      )}

      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/90 rounded-full p-3 shadow-lg">
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      )}
    </div>
  );
}