import { PrismaClient } from '@prisma/client';
import User from '../../src/core/entities/User';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../src/envConfig';

const prisma = new PrismaClient();

export const user = new User({
  id: '75531e88-6cc1-41ef-b465-bd003687afea',
  name: 'admin',
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
});

user.verified = true;

async function main() {
  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
