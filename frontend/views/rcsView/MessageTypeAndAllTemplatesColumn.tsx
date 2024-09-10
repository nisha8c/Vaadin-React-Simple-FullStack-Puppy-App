import { useEffect, useState } from "react";
import TextMessage from "Frontend/generated/com/example/application/data/rcsTemplate/TextMessage";
import ChoiceMessage from "Frontend/generated/com/example/application/data/rcsTemplate/ChoiceMessage";
import MediaMessage from "Frontend/generated/com/example/application/data/rcsTemplate/MediaMessage";
import CardMessage from "Frontend/generated/com/example/application/data/rcsTemplate/CardMessage";
import CarouselMessage from "Frontend/generated/com/example/application/data/rcsTemplate/CarouselMessage";
import LocationMessage from "Frontend/generated/com/example/application/data/rcsTemplate/LocationMessage";
import {
    CardMessageService, CarouselMessageService,
    ChoiceMessageService, LocationMessageService,
    MediaMessageService,
    TextMessageService
} from "Frontend/generated/endpoints";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { Button } from "@hilla/react-components/Button";
import { VirtualList } from "@hilla/react-components/VirtualList";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {Icon} from "@hilla/react-components/Icon";
import {Checkbox} from "@hilla/react-components/Checkbox";
import {TextField} from "@hilla/react-components/TextField";

// Define a union type for all message types
type AllRCSMessages = TextMessage | ChoiceMessage | MediaMessage | CardMessage | CarouselMessage | LocationMessage;

const MessageTypeAndAllTemplatesColumn = () => {
    const [templates, setTemplates] = useState<AllRCSMessages[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const pageable = { pageNumber: 0, pageSize: 10, sort: { orders: [] } };
                const filter = undefined;

                const textResponse: TextMessage[] = await TextMessageService.list(pageable, filter);
                const choiceResponse: ChoiceMessage[] = await ChoiceMessageService.list(pageable, filter);
                const mediaResponse: MediaMessage[] = await MediaMessageService.list(pageable, filter);
                const cardResponse: CardMessage[] = await CardMessageService.list(pageable, filter);
                const carouselResponse: CarouselMessage[] = await CarouselMessageService.list(pageable, filter);
                const locationResponse: LocationMessage[] = await LocationMessageService.list(pageable, filter);

                // Merge all templates into one array
                const allTemplates: AllRCSMessages[] = [
                    ...textResponse,
                    ...choiceResponse,
                    ...mediaResponse,
                    ...cardResponse,
                    ...carouselResponse,
                    ...locationResponse
                ];

                setTemplates(allTemplates);
            } catch (error) {
                console.error("Failed to fetch templates:", error);
            }
        })(); // Immediately Invoked Function Expression (IIFE)
    }, []);

    // Type guard functions
    const isTextMessage = (item: AllRCSMessages): item is TextMessage => 'textContent' in item;
    const isChoiceMessage = (item: AllRCSMessages): item is ChoiceMessage => 'question' in item;
    const isMediaMessage = (item: AllRCSMessages): item is MediaMessage => 'mediaUrl' in item;
    const isCardMessage = (item: AllRCSMessages): item is CardMessage => 'title' in item;
    const isCarouselMessage = (item: AllRCSMessages): item is CarouselMessage => 'title' in item;
    const isLocationMessage = (item: AllRCSMessages): item is LocationMessage => 'address' in item;

    const templateRenderer = ({ item }: { item: AllRCSMessages }) => {
        // Render different types of templates based on their type
        return (
            <VerticalLayout theme={'spacing-xs'} className={'rcs-virtual-list-template-card p-m mt-m border border-contrast-20'}>
                <HorizontalLayout className={'w-full'}>
                    <div className={'template-card-title flex-grow'}>{item.name}</div>
                    <Checkbox></Checkbox>
                </HorizontalLayout>
                <span className="template-card-content-text">{item.name}</span>
                <HorizontalLayout className={'w-full items-center'}>
                    <div className="template-card-type flex-grow">{'type'}</div>
                    {createTemplateCardButton('lumo:search', () => {})}
                    {createTemplateCardButton('lumo:search', () => {})}
                    {createTemplateCardButton('lumo:search', () => {})}
                </HorizontalLayout>
            </VerticalLayout>
        );
        /*
        if (isTextMessage(item)) {
            return <div>Text: {item.name}</div>;
        } else if (isChoiceMessage(item)) {
            return <div>Choice: {item.name}</div>;
        } else if (isMediaMessage(item)) {
            return <div>Media: {item.name}</div>;
        } else if (isCardMessage(item)) {
            return <div>Card: {item.name}</div>;
        } else if (isCarouselMessage(item)) {
            return <div>Carousel: {item.name}</div>;
        } else if (isLocationMessage(item)) {
            return <div>Location: {item.name}</div>;
        } else {
            return <div>Unknown template type</div>;
        }
         */
    };

    const createTemplateCardButton = (iconClass: string, clickListener: () => void) => {
        return (
            <Button theme={'tertiary-inline icon'} onClick={clickListener}>
                <Icon icon={iconClass} className={'m-xs template-card-button-icon'} />
            </Button>
        );
    }

    const renderButtonRow = (buttons: { icon: string, label: string }[]) => {
        return (
            <div className="button-container">
                {
                    buttons.map((button, index) => (
                        <Button className={'message-type-button'} key={index}>
                            <Icon className={'rcs-type-button-icon'} icon={button.icon}/>
                            <span className="button-label">{button.label}</span>
                        </Button>
                    ))
                }
            </div>
        );
    }

    return (
        <VerticalLayout theme={'spacing-xs'} className={'h-full flex bg-contrast-5 rounded-s p-s'}>
            <VerticalLayout theme={'spacing'} className={'rcs-message-type-selection-container bg-base rounded-s p-m mb-s'}>
                <span className="container-label">Choose Message type</span>
                {renderButtonRow([
                    { icon: 'lumo:search', label: "Text" },
                    { icon: 'lumo:search', label: "Choice" },
                    { icon: 'lumo:search', label: "Media" },
                    { icon: 'lumo:search', label: "Card" },
                    { icon: 'lumo:search', label: "Carousel" },
                    { icon: 'lumo:search', label: "Location" },
                ])}
            </VerticalLayout>

            <VerticalLayout className={'w-full h-full flex rcs-all-templates-container p-m'}>
                <span className={'container-label'}>{'All Templates'}</span>
                <TextField className={'w-full mt-s'} placeholder={'Search template'} clearButtonVisible>
                    <Icon slot="suffix" icon='lumo:search' />
                </TextField>
                <HorizontalLayout className={'w-full gap-x-m mt-xs'}>
                    <Button className={'flex-grow'}>{'All'}</Button>
                    <Button className={'flex-grow'}>{'Popular'}</Button>
                    <Button className={'flex-grow'}>{'Latest'}</Button>
                </HorizontalLayout>
                <VirtualList className={'mt-s'} items={templates}>{templateRenderer}</VirtualList>
            </VerticalLayout>
        </VerticalLayout>
    );
}
export default MessageTypeAndAllTemplatesColumn;
