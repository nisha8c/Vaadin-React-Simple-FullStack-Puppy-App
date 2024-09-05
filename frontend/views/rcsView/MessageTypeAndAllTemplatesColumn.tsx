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
    const isTextMessage = (item: AllRCSMessages): item is TextMessage => 'content' in item;
    const isChoiceMessage = (item: AllRCSMessages): item is ChoiceMessage => 'question' in item;
    const isMediaMessage = (item: AllRCSMessages): item is MediaMessage => 'url' in item;
    const isCardMessage = (item: AllRCSMessages): item is CardMessage => 'title' in item;
    const isCarouselMessage = (item: AllRCSMessages): item is CarouselMessage => 'title' in item;
    const isLocationMessage = (item: AllRCSMessages): item is LocationMessage => 'address' in item;

    const templateRenderer = ({ item }: { item: AllRCSMessages }) => {
        // Render different types of templates based on their type
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
    };

    return (
        <VerticalLayout className={'h-full flex bg-contrast-5 rounded-s p-s'}>

            <VerticalLayout className={'bg-base rounded-s p-m'}>
                <Button>Text</Button>
                <Button>Choice</Button>
                <Button>Media</Button>
                <Button>Card</Button>
                <Button>Carousel</Button>
                <Button>Location</Button>
            </VerticalLayout>

            <VerticalLayout className={'w-full h-full flex'}>
                <VirtualList items={templates}>{templateRenderer}</VirtualList>
            </VerticalLayout>
        </VerticalLayout>
    );
}
export default MessageTypeAndAllTemplatesColumn;
