// Content and Media Types
export interface Video {
  id: string;
  thumbnail: string;
  playlistUrl: string;
  episodeCount: number;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  episodeCount: number;
}

// Component Props Types
export interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  signOut?: () => void;
  user?: {
    username: string;
    [key: string]: any;
  };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Common utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}