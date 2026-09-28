import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Octo Crushers',
        description: 'Strength-focused teammates chasing weekly personal records.',
      },
      {
        name: 'Cardio Coders',
        description: 'Endurance athletes who turn every sprint into a clean deploy.',
      },
      {
        name: 'Flexbox Flyers',
        description: 'Mobility and balance fans building consistency together.',
      },
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@example.com', teamId: teams[0]._id },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', teamId: teams[0]._id },
      { name: 'Priya Patel', email: 'priya.patel@example.com', teamId: teams[1]._id },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', teamId: teams[1]._id },
      { name: 'Avery Brooks', email: 'avery.brooks@example.com', teamId: teams[2]._id },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, { memberIds: [users[0]._id, users[1]._id] }),
      Team.findByIdAndUpdate(teams[1]._id, { memberIds: [users[2]._id, users[3]._id] }),
      Team.findByIdAndUpdate(teams[2]._id, { memberIds: [users[4]._id] }),
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Strength training',
        durationMinutes: 45,
        caloriesBurned: 360,
        completedAt: new Date('2026-09-21T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Indoor cycling',
        durationMinutes: 50,
        caloriesBurned: 520,
        completedAt: new Date('2026-09-22T18:15:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Tempo run',
        durationMinutes: 38,
        caloriesBurned: 410,
        completedAt: new Date('2026-09-23T06:45:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'Rowing intervals',
        durationMinutes: 30,
        caloriesBurned: 330,
        completedAt: new Date('2026-09-24T12:00:00Z'),
      },
      {
        userId: users[4]._id,
        type: 'Yoga flow',
        durationMinutes: 60,
        caloriesBurned: 240,
        completedAt: new Date('2026-09-25T19:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[2]._id, teamId: teams[1]._id, points: 980, rank: 1 },
      { userId: users[1]._id, teamId: teams[0]._id, points: 915, rank: 2 },
      { userId: users[0]._id, teamId: teams[0]._id, points: 870, rank: 3 },
      { userId: users[3]._id, teamId: teams[1]._id, points: 820, rank: 4 },
      { userId: users[4]._id, teamId: teams[2]._id, points: 760, rank: 5 },
    ]);

    await Workout.insertMany([
      {
        title: 'Foundation Strength Circuit',
        description: 'A full-body circuit with squats, push-ups, rows, and loaded carries.',
        difficulty: 'beginner',
        durationMinutes: 35,
      },
      {
        title: 'Threshold Run Builder',
        description: 'Warm up, hold a challenging tempo pace, then cool down with easy strides.',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        title: 'Advanced Row and Lift',
        description: 'Alternating rowing sprints with compound lifts for power and stamina.',
        difficulty: 'advanced',
        durationMinutes: 55,
      },
      {
        title: 'Mobility Reset',
        description: 'Low-impact mobility work for hips, shoulders, hamstrings, and spine.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
    ]);

    console.log('Database seeding complete');
    console.log(`Created ${users.length} users, ${teams.length} teams, 5 activities, 5 leaderboard entries, and 4 workouts`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
