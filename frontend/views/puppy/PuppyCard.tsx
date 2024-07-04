import React from "react";
import Puppy from "Frontend/generated/com/example/application/data/Puppy";
import {Link, useNavigate} from "react-router-dom";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Button} from "@hilla/react-components/Button";

interface PuppyCardProps {
    puppyData: Puppy;
}

const PuppyCard: React.FC<PuppyCardProps> = ({ puppyData}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/puppies/${puppyData.id}`);
    };
    return (
        <VerticalLayout>
            <div onClick={() => handleClick()} className={'p-m m-m border border-contrast-30 rounded-s'}>
                <h2>{puppyData.name}</h2>
                <p>{puppyData.breed}</p>
            </div>
        </VerticalLayout>

    );
}
export default PuppyCard;
