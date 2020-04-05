import casual from 'casual';

const orgTypes = ['Supermarket', 'Organization', 'Restaurant', 'Cafeteria'];

const partnerMocks = (times: number) =>
  new Array(times).fill('').map(() => ({
    id: casual.uuid,
    name: `${casual.company_name} ${casual.random_element(orgTypes)}`,
    description: casual.description,
  }));

export default () => partnerMocks(casual.integer(8, 15));
