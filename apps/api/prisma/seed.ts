import bcrypt from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@megamoveis.com';
  const adminPassword = 'Admin@123';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Administrador',
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      name: 'Administrador',
      email: adminEmail,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  const categories = [
    {
      name: 'Sofás',
      slug: 'sofas',
      description: 'Sofás para sala de estar',
      isActive: true,
      sortOrder: 1,
    },
    {
      name: 'Geladeiras',
      slug: 'geladeiras',
      description: 'Geladeiras e refrigeradores',
      isActive: true,
      sortOrder: 2,
    },
    {
      name: 'Televisores',
      slug: 'televisores',
      description: 'TVs para todos os ambientes',
      isActive: true,
      sortOrder: 3,
    },
    {
      name: 'Eletroportáteis',
      slug: 'eletroportateis',
      description: 'Itens práticos para o dia a dia',
      isActive: true,
      sortOrder: 4,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const brands = [
    {
      name: 'Electrolux',
      slug: 'electrolux',
      isActive: true,
    },
    {
      name: 'Brastemp',
      slug: 'brastemp',
      isActive: true,
    },
    {
      name: 'Samsung',
      slug: 'samsung',
      isActive: true,
    },
    {
      name: 'LG',
      slug: 'lg',
      isActive: true,
    },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }

  const existingSettings = await prisma.storeSettings.findFirst();

  if (!existingSettings) {
    await prisma.storeSettings.create({
      data: {
        storeName: 'Mega Móveis',
        whatsappNumber: '5575999999999',
        contactEmail: 'contato@megamoveis.com',
        phoneNumber: '(75) 99999-9999',
        addressLine: 'Rua Exemplo, 123',
        city: 'Serrinha',
        state: 'BA',
        zipCode: '48700-000',
        aboutTitle: 'Sobre a Mega Móveis',
        aboutText:
          'Loja especializada em móveis e eletrodomésticos, com atendimento personalizado e vendas via WhatsApp.',
        instagramUrl: 'https://instagram.com/megamoveis',
        facebookUrl: 'https://facebook.com/megamoveis',
      },
    });
  }

  console.log('Seed executada com sucesso.');
  console.log(`Admin criado/atualizado: ${adminEmail}`);
  console.log(`Senha inicial do admin: ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
