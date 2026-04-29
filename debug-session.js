const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const session = await prisma.session.findFirst({
        orderBy: { createdAt: 'desc' },
    });

    if (session) {
        console.log('Latest Session:', session);
        console.log('Created At:', session.createdAt);
        console.log('Expires At:', session.expiresAt);

        if (session.expiresAt) {
            const diff = new Date(session.expiresAt).getTime() - new Date(session.createdAt).getTime();
            console.log('Duration (ms):', diff);
            console.log('Duration (min):', diff / 60000);
        }
    } else {
        console.log('No sessions found.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
