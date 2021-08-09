import './css/DogProfile.css'
import { IDog } from "../types/Dog";
import { useParams } from 'react-router-dom';
import { getDogById, deleteDog, updateDog } from '../services/dog-api-service';
import { FunctionComponent, useState, useEffect, ReactElement, Fragment, ChangeEvent } from 'react';


export const DogProfile: FunctionComponent = (props: any) => {
    const [ dog, setDog ] = useState<IDog>();
    const [ notFound, setNotFound ] = useState<boolean>(false);
    const [ editField, setEditField ] = useState<boolean>(false);
    const [ editedDescription, setEditedDescription ] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!dog) {
            getDogById(id)
                .then(res => setDog(res[0]))
                .catch(() => setNotFound(true));
          }
    }, [ dog, id ]);

    const determineContent = () => {
        if (notFound) {
            return (
                <div className='no-profile'>
                    <span>No profile exists for this pup...</span>
                </div>
            )
        } else {
            return <span>Loading...</span>
        }
    };

    const removeProfile = async (): Promise<void> => {
       await deleteDog(id);
       props.history.push('/')
    };

    const updateProfile = async (): Promise<void> => {
        if (dog) {
            const updatedDog: IDog = {
                id: dog.id,
                breed: dog.breed,
                description: editedDescription,
                image: {
                    type: dog.image.type,
                    data: dog.image.data
                },
            };

            await updateDog(updatedDog);
            dog.description = editedDescription;
        }

        setEditField(false);
    };
 

    const showEditArea = (): ReactElement => {
        return (
            <>
                <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditedDescription(e.target.value)} required className="form-control">{dog?.description}</textarea>
                <button  onClick={() => editedDescription ? updateProfile() : setEditField(false)} type="button" className="btn btn-outline-info submit-button">Save Edit</button>
                <button  onClick={() => setEditField(false)} type="button" className="btn btn-outline-dark cancel-button">Cancel</button>
            </>
        );
    };
 

    const showProfile = (dog: IDog) => {  
        const confirmationMessage: string = 'Are you sure you wish to delete this profile?';

        const dogProfile: ReactElement = (
            <>
                <h1>{dog.breed}</h1>
                <img src={`data:image/png;base64,${dog.image.data}`} alt={dog.breed} className='profile-img'></img>
                <p>{editField ? showEditArea() : editedDescription ? editedDescription : dog.description}</p>
                <button onClick={() => setEditField(true)} type="button" className="btn btn-outline-info edit-button">Edit Profile</button>
                <button onClick={() => (window.confirm(confirmationMessage)) ? removeProfile() : null} type="button" className="btn btn-outline-danger delete-button">Delete Profile</button>
            </>
        );

        return dogProfile;
    }
    
      return (
        <>
            {dog ? showProfile(dog) : determineContent()}
        </>
      );
}