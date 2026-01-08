import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');


  await prisma.attendee.deleteMany();
  await prisma.event.deleteMany();
  console.log('✅ Cleared existing data');


  const techConference = await prisma.event.create({
    data: {
      title: 'Tech Innovation Summit 2026',
      date: new Date('2026-03-15'),
      description: 'Join us for the biggest tech conference of the year featuring AI, Web3, and cutting-edge innovations.',
      capacity: 500,
    },
  });

  const webinarAI = await prisma.event.create({
    data: {
      title: 'AI & Machine Learning Workshop',
      date: new Date('2026-02-20'),
      description: 'Hands-on workshop covering the latest in artificial intelligence and machine learning technologies.',
      capacity: 50,
    },
  });

  const startupMeetup = await prisma.event.create({
    data: {
      title: 'Startup Networking Meetup',
      date: new Date('2026-02-10'),
      description: 'Connect with fellow entrepreneurs, investors, and innovators in the startup ecosystem.',
      capacity: 100,
    },
  });

  const designSprint = await prisma.event.create({
    data: {
      title: 'UX Design Sprint Bootcamp',
      date: new Date('2026-04-05'),
      description: 'Intensive 3-day bootcamp on user experience design, prototyping, and user testing.',
      capacity: 30,
    },
  });

  const devOpsConf = await prisma.event.create({
    data: {
      title: 'DevOps & Cloud Infrastructure Summit',
      date: new Date('2026-05-12'),
      description: 'Explore best practices in DevOps, cloud computing, and infrastructure automation.',
      capacity: 200,
    },
  });

  const fullEvent = await prisma.event.create({
    data: {
      title: 'Blockchain & Crypto Conference (FULL)',
      date: new Date('2026-03-25'),
      description: 'Deep dive into blockchain technology, cryptocurrencies, and decentralized applications.',
      capacity: 20,
    },
  });

  console.log('✅ Created 6 events');

 
  const techAttendees = await prisma.attendee.createMany({
    data: [
      { name: 'Alice Johnson', email: 'alice.johnson@email.com', eventId: techConference.id },
      { name: 'Bob Smith', email: 'bob.smith@email.com', eventId: techConference.id },
      { name: 'Carol White', email: 'carol.white@email.com', eventId: techConference.id },
      { name: 'David Brown', email: 'david.brown@email.com', eventId: techConference.id },
      { name: 'Emma Davis', email: 'emma.davis@email.com', eventId: techConference.id },
      { name: 'Frank Miller', email: 'frank.miller@email.com', eventId: techConference.id },
      { name: 'Grace Lee', email: 'grace.lee@email.com', eventId: techConference.id },
      { name: 'Henry Wilson', email: 'henry.wilson@email.com', eventId: techConference.id },
      { name: 'Ivy Chen', email: 'ivy.chen@email.com', eventId: techConference.id },
      { name: 'Jack Taylor', email: 'jack.taylor@email.com', eventId: techConference.id },
    ],
  });

  
  await prisma.attendee.createMany({
    data: [
      { name: 'Karen Martinez', email: 'karen.martinez@email.com', eventId: webinarAI.id },
      { name: 'Leo Garcia', email: 'leo.garcia@email.com', eventId: webinarAI.id },
      { name: 'Maya Patel', email: 'maya.patel@email.com', eventId: webinarAI.id },
      { name: 'Nathan Kim', email: 'nathan.kim@email.com', eventId: webinarAI.id },
      { name: 'Olivia Rodriguez', email: 'olivia.rodriguez@email.com', eventId: webinarAI.id },
      { name: 'Paul Anderson', email: 'paul.anderson@email.com', eventId: webinarAI.id },
      { name: 'Quinn Murphy', email: 'quinn.murphy@email.com', eventId: webinarAI.id },
    ],
  });

 
  await prisma.attendee.createMany({
    data: [
      { name: 'Rachel Green', email: 'rachel.green@email.com', eventId: startupMeetup.id },
      { name: 'Sam Cooper', email: 'sam.cooper@email.com', eventId: startupMeetup.id },
      { name: 'Tina Foster', email: 'tina.foster@email.com', eventId: startupMeetup.id },
      { name: 'Uma Singh', email: 'uma.singh@email.com', eventId: startupMeetup.id },
      { name: 'Victor Hughes', email: 'victor.hughes@email.com', eventId: startupMeetup.id },
    ],
  });

 
  await prisma.attendee.createMany({
    data: [
      { name: 'Wendy Clark', email: 'wendy.clark@email.com', eventId: designSprint.id },
      { name: 'Xander Brooks', email: 'xander.brooks@email.com', eventId: designSprint.id },
      { name: 'Yara Ahmed', email: 'yara.ahmed@email.com', eventId: designSprint.id },
      { name: 'Zack Thompson', email: 'zack.thompson@email.com', eventId: designSprint.id },
    ],
  });


  await prisma.attendee.createMany({
    data: [
      { name: 'Amy Walker', email: 'amy.walker@email.com', eventId: devOpsConf.id },
      { name: 'Brian Hall', email: 'brian.hall@email.com', eventId: devOpsConf.id },
      { name: 'Chloe Young', email: 'chloe.young@email.com', eventId: devOpsConf.id },
      { name: 'Derek King', email: 'derek.king@email.com', eventId: devOpsConf.id },
      { name: 'Elena Scott', email: 'elena.scott@email.com', eventId: devOpsConf.id },
      { name: 'Felix Wright', email: 'felix.wright@email.com', eventId: devOpsConf.id },
    ],
  });

  
  await prisma.attendee.createMany({
    data: [
      { name: 'George Adams', email: 'george.adams@email.com', eventId: fullEvent.id },
      { name: 'Hannah Baker', email: 'hannah.baker@email.com', eventId: fullEvent.id },
      { name: 'Ian Carter', email: 'ian.carter@email.com', eventId: fullEvent.id },
      { name: 'Julia Davis', email: 'julia.davis@email.com', eventId: fullEvent.id },
      { name: 'Kevin Evans', email: 'kevin.evans@email.com', eventId: fullEvent.id },
      { name: 'Laura Foster', email: 'laura.foster@email.com', eventId: fullEvent.id },
      { name: 'Mike Green', email: 'mike.green@email.com', eventId: fullEvent.id },
      { name: 'Nina Harris', email: 'nina.harris@email.com', eventId: fullEvent.id },
      { name: 'Oscar James', email: 'oscar.james@email.com', eventId: fullEvent.id },
      { name: 'Paula Kelly', email: 'paula.kelly@email.com', eventId: fullEvent.id },
      { name: 'Quincy Lewis', email: 'quincy.lewis@email.com', eventId: fullEvent.id },
      { name: 'Rita Moore', email: 'rita.moore@email.com', eventId: fullEvent.id },
      { name: 'Steve Nelson', email: 'steve.nelson@email.com', eventId: fullEvent.id },
      { name: 'Tracy Owen', email: 'tracy.owen@email.com', eventId: fullEvent.id },
      { name: 'Ursula Parker', email: 'ursula.parker@email.com', eventId: fullEvent.id },
      { name: 'Vince Quinn', email: 'vince.quinn@email.com', eventId: fullEvent.id },
      { name: 'Wanda Reed', email: 'wanda.reed@email.com', eventId: fullEvent.id },
      { name: 'Xavier Stone', email: 'xavier.stone@email.com', eventId: fullEvent.id },
      { name: 'Yvonne Turner', email: 'yvonne.turner@email.com', eventId: fullEvent.id },
      { name: 'Zane Underwood', email: 'zane.underwood@email.com', eventId: fullEvent.id },
    ],
  });

  console.log('✅ Created 52 attendees across all events');


  const eventCount = await prisma.event.count();
  const attendeeCount = await prisma.attendee.count();

  console.log('\n📊 Database Seeding Summary:');
  console.log(`   Events: ${eventCount}`);
  console.log(`   Attendees: ${attendeeCount}`);
  console.log('\n✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });