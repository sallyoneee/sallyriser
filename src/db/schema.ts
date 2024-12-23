import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const shops = sqliteTable('shops', {
  id: text('id').primaryKey(),
  instagramHandle: text('instagram_handle').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  isVerified: integer('is_verified', { mode: 'boolean' }).notNull().default(false),
  ownerVerified: integer('owner_verified', { mode: 'boolean' }).notNull().default(false),
  isPremium: integer('is_premium', { mode: 'boolean' }).notNull().default(false),
  ownerId: text('owner_id'),
  averageRating: real('average_rating').notNull().default(0),
  totalReviews: integer('total_reviews').notNull().default(0),
  contactInfo: text('contact_info'),
  createdAt: text('created_at').notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shops.id),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  createdAt: text('created_at').notNull(),
});

export const screenshots = sqliteTable('screenshots', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shops.id),
  url: text('url').notNull(),
  caption: text('caption'),
  createdAt: text('created_at').notNull(),
});

export const verificationRequests = sqliteTable('verification_requests', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shops.id),
  proofUrl: text('proof_url').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shops.id),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),
  content: text('content').notNull(),
  type: text('type').notNull(), // 'support', 'promotion', 'report'
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

// Zod schemas for validation
export const insertShopSchema = createInsertSchema(shops);
export const selectShopSchema = createSelectSchema(shops);

export const insertReviewSchema = createInsertSchema(reviews);
export const selectReviewSchema = createSelectSchema(reviews);

export const insertScreenshotSchema = createInsertSchema(screenshots);
export const selectScreenshotSchema = createSelectSchema(screenshots);

export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);