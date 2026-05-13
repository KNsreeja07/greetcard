export type Category = 'Birthday' | 'Anniversary' | 'Festival' | 'Wedding' | 'Congratulations' | 'New Year';

export interface Template {
  id: string;
  title: string;
  category: Category;
  image: string;
  isPremium: boolean;
  textColor: string;
  namePosition: { x: number; y: number };
  photoPosition: { x: number; y: number };
  photoSize: number;
}

export const CATEGORIES: Category[] = ['Birthday', 'Anniversary', 'Festival', 'Wedding', 'Congratulations', 'New Year'];

export const TEMPLATES: Template[] = [
  // Birthday
  {
    id: 'b1',
    title: 'Golden Birthday',
    category: 'Birthday',
    image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 80 },
    photoPosition: { x: 50, y: 35 },
    photoSize: 22,
  },
  {
    id: 'b2',
    title: 'Confetti Party',
    category: 'Birthday',
    image: 'https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  {
    id: 'b3',
    title: 'Floral Birthday',
    category: 'Birthday',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#2d1a0e',
    namePosition: { x: 50, y: 80 },
    photoPosition: { x: 50, y: 36 },
    photoSize: 22,
  },
  {
    id: 'b4',
    title: 'Balloon Blast',
    category: 'Birthday',
    image: 'https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  // Anniversary
  {
    id: 'a1',
    title: 'Rose Romance',
    category: 'Anniversary',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#fff0f0',
    namePosition: { x: 50, y: 80 },
    photoPosition: { x: 50, y: 36 },
    photoSize: 22,
  },
  {
    id: 'a2',
    title: 'Golden Love',
    category: 'Anniversary',
    image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#f5e6c8',
    namePosition: { x: 50, y: 80 },
    photoPosition: { x: 50, y: 36 },
    photoSize: 22,
  },
  {
    id: 'a3',
    title: 'Eternal Bond',
    category: 'Anniversary',
    image: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  // Festival
  {
    id: 'f1',
    title: 'Diwali Lights',
    category: 'Festival',
    image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#ffd700',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  {
    id: 'f2',
    title: 'Festive Colors',
    category: 'Festival',
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  {
    id: 'f3',
    title: 'Grand Celebration',
    category: 'Festival',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  // Wedding
  {
    id: 'w1',
    title: 'White Elegance',
    category: 'Wedding',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#3a2a1a',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  {
    id: 'w2',
    title: 'Garden Wedding',
    category: 'Wedding',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  // Congratulations
  {
    id: 'c1',
    title: 'Success Burst',
    category: 'Congratulations',
    image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  {
    id: 'c2',
    title: 'Achievement Gold',
    category: 'Congratulations',
    image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#ffd700',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  // New Year
  {
    id: 'ny1',
    title: 'New Year Glow',
    category: 'New Year',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: false,
    textColor: '#ffd700',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
  {
    id: 'ny2',
    title: 'Fireworks Gala',
    category: 'New Year',
    image: 'https://images.pexels.com/photos/1565355/pexels-photo-1565355.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPremium: true,
    textColor: '#ffffff',
    namePosition: { x: 50, y: 82 },
    photoPosition: { x: 50, y: 38 },
    photoSize: 20,
  },
];
