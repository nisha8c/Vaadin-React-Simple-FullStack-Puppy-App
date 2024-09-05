import React, { useState } from "react";
import { TextField } from "@hilla/react-components/TextField";
import { Button } from "@hilla/react-components/Button";
import { createPuppy } from "Frontend/generated/PuppyService";
import Puppy from "Frontend/generated/com/example/application/data/Puppy";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Link, useNavigate} from "react-router-dom";


const AddPuppy = () => {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newPuppy: Puppy = {
            id: Math.floor(Math.random() * 1000), // temporary id
            name,
            breed,
            description
        };


        await createPuppy(newPuppy);

        // Clear the form
        setName("");
        setBreed("");
        setDescription("");
        alert('New Puppy is added successfully!');
        navigate('/puppies')
    };

    return (
        <VerticalLayout theme={'margin padding spacing'}>
            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} />
            <TextField label="Breed" value={breed} onChange={e => setBreed(e.target.value)} />
            <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <Button onClick={handleSubmit}>Add new puppy</Button>
            <Link to={'/puppies'}>
                <Button>Go back</Button>
            </Link>
        </VerticalLayout>
    );
};

export default AddPuppy;
