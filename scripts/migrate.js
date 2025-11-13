const { execSync } = require('child_process');

async function migrate() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not set, skipping migration');
      return;
    }

    console.log('Running database migrations...');
    execSync('npx prisma db push --skip-generate --accept-data-loss', { stdio: 'inherit' });

    console.log('Seeding database...');
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    // Don't exit with error code, let the app start anyway
    console.log('Continuing with application startup...');
  }
}

migrate();
