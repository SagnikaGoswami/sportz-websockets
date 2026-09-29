import { pgTable, pgEnum,uuid,varchar,integer,timestamp,jsonb,text } from 'drizzle-orm/pg-core';

// Match Status
export const matchStatus = pgEnum('match_status', [
  'scheduled',
  'live',
  'finished',
]);

// Match Table
export const matches = pgTable('matches', {
  id: uuid('id').defaultRandom().primaryKey(),
  sport: varchar('sport').notNull(),
  homeTeam: varchar('home_team').notNull(),
  awayTeam: varchar('away_team').notNull(),
  status: matchStatus('status').notNull().default('scheduled'),
  startTime: timestamp('start_time', {
    withTimezone: true,
  }).notNull(),
  endTime: timestamp('end_time', {
    withTimezone: true,
  }),
  homeScore: integer('home_score').notNull().default(0),
  awayScore: integer('away_score').notNull().default(0),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow().notNull(),
});

// Commentary Table
export const commentary = pgTable('commentary', {
  id: uuid('id').defaultRandom().primaryKey(),
  matchId: uuid('match_id')
    .notNull()
    .references(() => matches.id, {
      onDelete: 'cascade',
    }),
  minute: integer('minute'),
  sequence: integer('sequence').notNull(),
  period: varchar('period'),
  eventType: varchar('event_type').notNull(),
  actor: varchar('actor'),
  team: varchar('team'),
  message: text('message').notNull(),
  metadata: jsonb('metadata'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow().notNull(),
});