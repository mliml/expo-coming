import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const features = [
    {
      name: 'Comprehensive China Exhibition Directory',
      description: 'Discover which conferences and exhibitions are most valuable for you to attend',
    },
    {
      name: 'Conference & Exhibition Venues in China',
      description: 'Find the perfect venue for your event in China - location matters',
    },
    {
      name: 'Inspiring China Expo Case Studies',
      description: 'Learn from successful examples to make your exhibition or conference a success',
    },
    {
      name: 'Guide to Attending Expos in China',
      description: 'Expert tips to help you navigate your first conference experience in China',
    },
    {
      name: 'Curated China Expo Suppliers',
      description: 'Connect with the best exhibition suppliers in China - we have done the research for you',
    },
  ];

  for (const feature of features) {
    await prisma.feature.upsert({
      where: { name: feature.name },
      update: {},
      create: feature,
    });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
