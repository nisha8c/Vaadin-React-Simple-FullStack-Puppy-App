import {useEffect, useState} from "react";
import Puppy from "Frontend/generated/com/example/application/data/Puppy";
import {getAllPuppies} from "Frontend/generated/PuppyService";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import PuppyCard from "Frontend/views/puppy/PuppyCard";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button";
import {FormLayout} from "@hilla/react-components/FormLayout";
import {useNavigate} from "react-router-dom";

const PuppyList = () => {
    const [puppies, setPuppies] = useState<Puppy[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllPuppies().then(setPuppies);
    }, []);

    const filteredPuppies = puppies.filter(puppy => {
        let matchesSearchTerm = true;
        let matchesFilter = true;

        if (searchTerm) {
            matchesSearchTerm = puppy.name.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return matchesSearchTerm && matchesFilter;
    });

    return (
        <VerticalLayout className={'p-m'}>
            <HorizontalLayout className={'w-full flex-wrap items-baseline gap-x-m justify-center'}>
                <FormLayout className={'flex-grow'} >
                    <TextField
                        placeholder={'Search by name...'}
                        value={searchTerm}
                        onInput={e => setSearchTerm((e.target as HTMLInputElement).value)}
                    />

                </FormLayout>

                <Button theme={'primary'} onClick={() => navigate('/add')}>Add new puppy</Button>
            </HorizontalLayout>
            <section>
                {filteredPuppies.map((puppy) => (
                    <PuppyCard key={puppy.id} puppyData={puppy}/>
                ))}
            </section>
        </VerticalLayout>
    );
}
export default PuppyList;