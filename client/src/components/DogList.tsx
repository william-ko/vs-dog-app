import './css/DogList.css'
import { IDog } from "../types/Dog";
import { Link } from 'react-router-dom';
import { CardGroup, Card } from "react-bootstrap";
import { getAllDogs } from "../services/dog-api-service";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";

export const DogList: FunctionComponent = () => {
    const [ dogs, setDogs ]: any = useState<IDog[]>([]);
    const [ notFound, setNotFound ] = useState<boolean>(false);

    useEffect(() => {
        if (!dogs.length) {
          getAllDogs()
            .then(res =>setDogs(res))
            .catch(() => setNotFound(true));
        }
    }, [ dogs.length ]);

    const showNotFoundMessage = () => {
      if (notFound) {
          return (
              <div className='no-profile'>
                  <span>There was a problem fetching the dog profiles...</span>
              </div>
          )
      }
    };

    const showDogList = (dogs: IDog[]): ReactElement[] => {
      return dogs.map((dog: IDog) => {       
        return (
          <Link to={`breed-profile/${dog.id}`} type="button" className="btn btn-light" key={dog.id}>
            <CardGroup>
              <Card>
                <Card.Img className="card-img"  src={`data:image/png;base64,${dog.image.data}`} />
                <Card.Body>
                  <Card.Title>{dog.breed}</Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
          </Link>
        );
      })
    };
    
    return (
      <div className="all-cards container">
        {dogs.length ? showDogList(dogs) : showNotFoundMessage()}
      </div>
      );
}