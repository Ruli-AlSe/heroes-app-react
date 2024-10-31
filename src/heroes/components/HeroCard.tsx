import { Link } from 'react-router-dom';
import { Hero } from '../data/heroes';

const CharactersByHero = ({ alter_ego, characters }: { alter_ego: string; characters: string }) => {
  if (alter_ego === characters) {
    return <></>;
  }

  return <p>{characters}</p>;
};

export const HeroCard = ({ id, superhero, alter_ego, first_appearance, characters }: Hero) => {
  const heroImageUrl = `/heroes/${id}.jpg`;

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} alt={superhero} className="card-img" />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-titl">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              <CharactersByHero alter_ego={alter_ego} characters={characters} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>More info...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
