import {AutoForm, AutoFormLayoutRendererProps, DeleteErrorEvent, SubmitErrorEvent} from "@hilla/react-crud";
import {ChoiceMessageService} from "Frontend/generated/endpoints";
import { Notification } from "@hilla/react-components/Notification";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {TextArea} from "@hilla/react-components/TextArea";
import {TextField} from "@hilla/react-components/TextField";
import ChoiceMessageModel from "Frontend/generated/com/example/application/data/rcsTemplate/ChoiceMessageModel";
import ChoiceMessage from "Frontend/generated/com/example/application/data/rcsTemplate/ChoiceMessage";
import React from "react";

const ChoiceMessageAutoForm = () => {
    const GroupingLayoutRenderer = ({ children, form }: AutoFormLayoutRendererProps<ChoiceMessageModel>) => {
        const { field, model } = form;
        const fieldsMapping = new Map<string, React.ReactElement>();
        children.forEach((field) => fieldsMapping.set(field.props?.propertyInfo?.name, field));

        return (
            <VerticalLayout theme={'spacing-xs'} className={'w-full'}>
                <TextField
                    {...field(model.name)}
                    label={'Choice Message Name:'}
                    className={'w-full'}
                ></TextField>
                <TextArea
                    {...field(model.textMessage)}
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
    const handleSubmitSuccess = ({item}: { item: ChoiceMessage }) => {
        Notification.show(`Choice Message for ID: ${item.id} has been created successfully!`, { theme: 'success' });
    }

    const handleSubmitError = ({ error }: SubmitErrorEvent) => {
        Notification.show(`Failed to submit form: ${error.message}`, { position: 'middle', theme: 'error' });
    };

    const handleDeleteSuccess = ({ item }: { item: ChoiceMessage }) => {
        Notification.show(`Choice Message with ID ${item.id} has been deleted successfully!`, { theme: 'success' });
    }

    const handleOnDeleteError = ({ error }: DeleteErrorEvent) => {
        Notification.show(`Failed to delete: ${error.message}`, { position: 'middle', theme: 'error' });
    };
    return (
        <AutoForm
            className={'w-full'}
            service={ChoiceMessageService}
            model={ChoiceMessageModel}
            layoutRenderer={GroupingLayoutRenderer}
            onSubmitSuccess={handleSubmitSuccess}
            onSubmitError={handleSubmitError}
            deleteButtonVisible={true}
            onDeleteSuccess={handleDeleteSuccess}
            onDeleteError={handleOnDeleteError}
        />
    );
}
export default ChoiceMessageAutoForm;