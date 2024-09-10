import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import MessageTypeAndAllTemplatesColumn from "Frontend/views/rcsView/MessageTypeAndAllTemplatesColumn";
import { RadioButton } from "@hilla/react-components/RadioButton";
import { RadioGroup } from "@hilla/react-components/RadioGroup";
import { useState } from "react";
import CodeEditor from "Frontend/components/CodeEditor";
import TextMessageAutoForm from "Frontend/views/rcsView/Forms/TextMessageAutoForm";
import ChoiceMessageAutoForm from "Frontend/views/rcsView/Forms/ChoiceMessageAutoForm";


const RcsView = () => {
    const [selectedEditor, setSelectedEditor] = useState("formEditor");
    const [code, setCode] = useState(
        `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`
    );


    return (
        <VerticalLayout className={'p-m w-full h-full'}>
            <HorizontalLayout className={'rcs-three-columns w-full h-full flex gap-x-xs'}>
                <MessageTypeAndAllTemplatesColumn />
                <VerticalLayout theme={'spacing-xs'} className={'flex-grow p-m bg-contrast-5 rounded-s h-full'}>
                    <span className={'span-for-radio-group'}>
                        <RadioGroup
                            theme="horizontal"
                            value={selectedEditor}
                            onValueChanged={(event) => setSelectedEditor(event.detail.value)}
                        >
                            <RadioButton value="formEditor" label="Form Editor" checked={true}/>
                            <RadioButton value="codeEditor" label="Code Editor"/>
                        </RadioGroup>
                    </span>
                    {selectedEditor === "formEditor" && (
                        <VerticalLayout className={'form-editor-layout w-full'}>
                            <TextMessageAutoForm></TextMessageAutoForm>
                        </VerticalLayout>
                    )}
                    {selectedEditor === "codeEditor" && (
                        <VerticalLayout className={'code-editor-layout w-full h-full'}>
                            <div>Code Editor Content</div>
                            <CodeEditor code={code}></CodeEditor>
                        </VerticalLayout>
                    )}
                </VerticalLayout>
            </HorizontalLayout>
        </VerticalLayout>
    );
}
export default RcsView;
