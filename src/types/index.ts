import { z } from 'zod';
import { 
  selectShopSchema, 
  selectReviewSchema, 
  selectScreenshotSchema,
  selectMessageSchema 
} from '../db/schema';

export type Shop = z.infer<typeof selectShopSchema>;
export type Review = z.infer<typeof selectReviewSchema>;
export type Screenshot = z.infer<typeof selectScreenshotSchema>;
export type Message = z.infer<typeof selectMessageSchema>;

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
  isPremium?: boolean;
  ownedShopId?: string;
}

export interface Settings {
  darkMode: boolean;
  anonymous: boolean;
  language: 'en' | 'fa';
}