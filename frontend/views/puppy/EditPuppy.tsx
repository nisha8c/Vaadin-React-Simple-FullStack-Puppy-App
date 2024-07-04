import React, {useEffect, useState} from "react";
import {useForm} from "@hilla/react-form";
import {getPuppy, updatePuppy} from "Frontend/generated/PuppyService";
import Puppy from "Frontend/generated/com/example/application/data/Puppy";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button";
import PuppyModel from "Frontend/generated/com/example/application/data/PuppyModel";
import {Link, useNavigate, useParams} from "react-router-dom";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";


export const EditPuppy = () => {
    const [puppy, setPuppy] = useState<Puppy | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { field, model, submit, reset, read } = useForm(PuppyModel, {
        onSubmit: async (updatedPuppy) => {
            await updatePuppy(updatedPuppy.id, updatedPuppy);
            alert(`The Puppy info for id ${updatedPuppy.id} is updated`);
            navigate('/puppies')
        }
    });

    useEffect(() => {
        getPuppy(Number(id)).then(puppy => {
            setPuppy(puppy);
            read(puppy);
        });
    }, [id]);

    if (!puppy) {
        return <div>Loading...</div>;
    }
    return (
        <VerticalLayout theme={'margin padding spacing'}>
            <TextField label="Name" {...field(model.name)} />
            <TextField label="Breed" {...field(model.breed)} />
            <TextField label="Description" {...field(model.description)} />
            <HorizontalLayout className="flex gap-m">
                <Button onClick={submit} theme="primary">Save</Button>
                <Button onClick={reset}>Reset</Button>
            </HorizontalLayout>
            <Link to={'/puppies'}>
                <Button>Go back</Button>
            </Link>
        </VerticalLayout>
    );
}
