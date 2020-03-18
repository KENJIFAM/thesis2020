import { Step } from '../components/Carousel';
import faker from 'faker';

export const capitalize = (str: string) => str.replace(/^./, str[0].toUpperCase());

export const users: string[] = ['u1', 'u2'];

export const news: Step[] = [
  {
    title: capitalize(faker.random.words(faker.random.number(5) + 1)),
    description: faker.lorem.sentence(),
    imgPath: faker.image.imageUrl(640, 480, 'food', true, true),
  },
  {
    title: capitalize(faker.random.words(faker.random.number(5) + 1)),
    description: faker.lorem.sentence(),
    imgPath: faker.image.imageUrl(640, 480, 'food', true, true),
  },
  {
    title: capitalize(faker.random.words(faker.random.number(5) + 1)),
    description: faker.lorem.sentence(),
    imgPath: faker.image.imageUrl(640, 480, 'food', true, true),
  },
  {
    title: capitalize(faker.random.words(faker.random.number(5) + 1)),
    description: faker.lorem.sentence(),
    imgPath: faker.image.imageUrl(640, 480, 'food', true, true),
  },
  {
    title: capitalize(faker.random.words(faker.random.number(5) + 1)),
    description: faker.lorem.sentence(),
    imgPath: faker.image.imageUrl(640, 480, 'food', true, true),
  },
];

export const supermarkets = [
  {
    id: faker.random.uuid(),
    city: 'Espoo',
    name: 'K-CITYMARKET Sello',
    description: faker.lorem.sentence(),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/K-Citymarket_logo_2016.svg/1024px-K-Citymarket_logo_2016.svg.png',
    containedImage: true,
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Helsinki',
    name: 'PRISMA Tripla',
    description: faker.lorem.sentence(),
    image: 'https://www.prisma.fi/wcsstore/SOK_Aurora/img/logos/prisma/logo.svg',
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Espoo',
    name: 'K-CITYMARKET Iso Omena',
    description: faker.lorem.sentence(),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/K-Citymarket_logo_2016.svg/1024px-K-Citymarket_logo_2016.svg.png',
    containedImage: true,
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Helsinki',
    name: 'PRISMA Malmi',
    description: faker.lorem.sentence(),
    image: 'https://www.prisma.fi/wcsstore/SOK_Aurora/img/logos/prisma/logo.svg',
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Espoo',
    name: 'K-CITYMARKET Sello',
    description: faker.lorem.sentence(),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/K-Citymarket_logo_2016.svg/1024px-K-Citymarket_logo_2016.svg.png',
    containedImage: true,
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Helsinki',
    name: 'PRISMA Tripla',
    description: faker.lorem.sentence(),
    image: 'https://www.prisma.fi/wcsstore/SOK_Aurora/img/logos/prisma/logo.svg',
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Espoo',
    name: 'K-CITYMARKET Iso Omena',
    description: faker.lorem.sentence(),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/K-Citymarket_logo_2016.svg/1024px-K-Citymarket_logo_2016.svg.png',
    containedImage: true,
    location: [24.941325187683105, 60.169938852212965],
  },
  {
    id: faker.random.uuid(),
    city: 'Helsinki',
    name: 'PRISMA Malmi',
    description: faker.lorem.sentence(),
    image: 'https://www.prisma.fi/wcsstore/SOK_Aurora/img/logos/prisma/logo.svg',
    location: [24.941325187683105, 60.169938852212965],
  },
];
