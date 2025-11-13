const { execSync } = require('child_process');

async function migrate() {
  try {
    console.log('Running database migrations...');
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });

    console.log('Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
