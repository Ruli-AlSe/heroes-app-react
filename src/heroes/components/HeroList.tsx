import { getHeroesByPublisher } from '../helpers';

export const HeroList = ({ publisher }: { publisher: string }) => {
  const heroes = getHeroesByPublisher(publisher);

  return (
    <ul>
      {heroes.map((hero) => (
        <li key={hero.id}>
          <p>{hero.superhero}</p>
        </li>
      ))}
    </ul>
  );
};
