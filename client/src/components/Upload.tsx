import './css/Upload.css';
import { IDog } from '../types/Dog';
import { Alert } from 'react-bootstrap';
import { createDog } from '../services/dog-api-service';
import { ChangeEvent, useState, FunctionComponent } from "react";

export const Upload: FunctionComponent = (props: any) => {
    const [ error, setError ] = useState<string>();
    const [ file, setFile ] = useState<File>();
    const [ breed, setBreed ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');

    const insertDog = async (): Promise<void> => {
        if (!file) {
            setError('Please select an image to upload');
            return;
        }

        const buffer = await file?.arrayBuffer();

        const dog: IDog = {
            breed,
            description,
            image: {
                type: 'Buffer',
                data: buffer
            }
        }

       await createDog(dog);
       props.history.push('/')
    }

    return (
        <>
            <h1>Create Profile</h1>
            <form className="container">
                <div className="form-group">
                    <input required className="form-control" placeholder="Enter breed" onChange={(e: ChangeEvent<HTMLInputElement>) => setBreed(e.target.value)}/>
                </div>
                <div className="custom-file">
                    <input required type="file" className="custom-file-input choose-file" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])} />
                    <label className="custom-file-label">{file?.name || 'Choose a file'}</label>
                </div>
                <textarea required className="form-control" placeholder="Enter a description of your pup" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}/>
            </form>
            <button onClick={() => insertDog()} type="button" className="btn btn-outline-primary">Upload</button>
            <div className='alert-message container'>
                {error && <Alert variant='danger'>{error}</Alert>}
            </div>
        </>
    );
}