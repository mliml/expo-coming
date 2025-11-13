import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all vote records
  await prisma.vote.deleteMany({});
  console.log('✅ All votes deleted');

  // Delete all features
  await prisma.feature.deleteMany({});
  console.log('✅ All features deleted');

  console.log('✅ Database reset successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
