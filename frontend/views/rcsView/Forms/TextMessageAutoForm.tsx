import {AutoForm, AutoFormLayoutRendererProps, DeleteErrorEvent, SubmitErrorEvent} from "@hilla/react-crud";
import {TextMessageService} from "Frontend/generated/endpoints";
import TextMessageModel from "Frontend/generated/com/example/application/data/rcsTemplate/TextMessageModel";
import TextMessage from "Frontend/generated/com/example/application/data/rcsTemplate/TextMessage";
import { Notification } from "@hilla/react-components/Notification";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {TextArea} from "@hilla/react-components/TextArea";
import {TextField} from "@hilla/react-components/TextField";

const TextMessageAutoForm = () => {
    const GroupingLayoutRenderer = ({ children, form }: AutoFormLayoutRendererProps<TextMessageModel>) => {
        const { field, model } = form;
        const fieldsMapping = new Map<string, React.ReactElement>();
        children.forEach((field) => fieldsMapping.set(field.props?.propertyInfo?.name, field));

        return (
            <VerticalLayout theme={'spacing-xs'} className={'w-full'}>
                <TextField
                    {...field(model.name)}
                    label={'Text Message Name:'}
                    className={'w-full'}
                ></TextField>
                <TextArea
                    {...field(model.textContent)}
                    label={'Body Text'}
                    required={true}
                    className={'w-full'}
                    onKeyDown={(event) => {
                        event.stopPropagation();
                    }}
                ></TextArea>
            </VerticalLayout>
        );

    }
    const handleSubmitSuccess = ({item}: { item: TextMessage }) => {
        Notification.show(`Text Message for ID: ${item.id} has been created successfully!`, { theme: 'success' });
    }

    const handleSubmitError = ({ error }: SubmitErrorEvent) => {
        Notification.show(`Failed to submit form: ${error.message}`, { position: 'middle', theme: 'error' });
    };

    const handleDeleteSuccess = ({ item }: { item: TextMessage }) => {
        Notification.show(`Text Message with ID ${item.id} has been deleted successfully!`, { theme: 'success' });
    }

    const handleOnDeleteError = ({ error }: DeleteErrorEvent) => {
        Notification.show(`Failed to delete: ${error.message}`, { position: 'middle', theme: 'error' });
    };
    return (
        <AutoForm
            className={'w-full'}
            service={TextMessageService}
            model={TextMessageModel}
            layoutRenderer={GroupingLayoutRenderer}
            onSubmitSuccess={handleSubmitSuccess}
            onSubmitError={handleSubmitError}
            deleteButtonVisible={true}
            onDeleteSuccess={handleDeleteSuccess}
            onDeleteError={handleOnDeleteError}
        />
    );
}
export default TextMessageAutoForm;