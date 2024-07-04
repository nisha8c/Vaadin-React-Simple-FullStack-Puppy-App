// PuppyInfo.tsx
import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Puppy from 'Frontend/generated/com/example/application/data/Puppy';
import { deletePuppy, getPuppy} from 'Frontend/generated/PuppyService';
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Button} from "@hilla/react-components/Button";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";


const PuppyInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [puppyData, setPuppyData] = useState<Puppy | null>(null);

    useEffect(() => {
        // Fetch the puppy data when the component mounts
        getPuppy(Number(id)).then(setPuppyData);
    }, [id]);

    const handleEdit = () => {
        navigate(`/puppies/${id}/edit`);
        console.log(`Editing puppy with id ${id}`);
    };

    const handleDelete = async () => {
        try {
            await deletePuppy(Number(id));
            alert(`The puppy with name ${puppyData?.name} and id ${id} is deleted`);
            navigate('/puppies')
        } catch (error) {
            console.error(error);
        }
    };

    if (!puppyData) {
        return <div>Loading...</div>;
    }

    return (
        <VerticalLayout className={'p-m'}>
            <h2>{puppyData.name}</h2>
            <p>{puppyData.breed}</p>
            <p>{puppyData.description}</p>
            <HorizontalLayout className={'gap-x-m content-between'}>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </HorizontalLayout>
            <Link to={'/puppies'}>
                <Button>Go back</Button>
            </Link>
        </VerticalLayout>
    );
};

export default PuppyInfo;
