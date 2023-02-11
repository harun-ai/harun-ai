import { PrismaClient } from '@prisma/client';
import User from '../../../core/entities/User';
import BcryptEncriptorProvider from '../../../provider/oneWayencryptorProvider/bcryptEncryptorProvider';

const prisma = new PrismaClient();

async function main() {
  const user = new User({
    id: '75531e88-6cc1-41ef-b465-bd003687afea',
    name: 'admin',
    email: process.env.ADMIN_EMAIL as string,
    password: await new BcryptEncriptorProvider().encrypt(
      process.env.ADMIN_PASSWORD as string
    ),
  });

  user.verified = true;

  await prisma.user.upsert({
    where: { email: user.email },
    update: user,
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
