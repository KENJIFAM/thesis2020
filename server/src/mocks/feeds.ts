import casual from 'casual';

const images = [
  'https://www.foodiesfeed.com/wp-content/uploads/2019/02/bell-peppers-and-other-fresh-vegetables-in-a-store.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2016/08/bunch-of-pak-choi-in-a-grocery-store.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2017/03/eggs-in-a-grocery-store.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2019/03/fresh-eggs-in-a-grocery-store-1.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2016/08/fresh-green-lettuce-in-a-grocery-store.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2018/08/frozen-mix-of-vegetables-in-a-supermarket.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2018/08/frozen-peas-in-a-supermarket.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2017/05/fruit-juices-in-supermarket.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2017/10/girl-buying-radishes.jpg',
  'https://www.foodiesfeed.com/wp-content/uploads/2016/04/romanesco-broccoli-in-a-grocery-store-2.jpg',
];

const unique5 = () => {
  const set = new Set<number>();
  while (set.size < 5) {
    set.add(casual.integer(0, 9));
  }
  return [...set];
};

const feedMocks = () =>
  unique5().map((i) => ({
    title: casual.title,
    description: casual.description,
    imgPath: images[i],
  }));

export default feedMocks;
