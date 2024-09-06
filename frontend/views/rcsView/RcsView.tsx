import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import MessageTypeAndAllTemplatesColumn from "Frontend/views/rcsView/MessageTypeAndAllTemplatesColumn";
import { RadioButton } from "@hilla/react-components/RadioButton";
import { RadioGroup } from "@hilla/react-components/RadioGroup";
import { useState } from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"

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
        <VerticalLayout className={'p-m w-full h-full'} theme={'spacing-xs'}>
            <HorizontalLayout className={'w-full h-full flex flex-wrap gap-x-m'}>
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
                        <VerticalLayout className={'form-editor-layout'}>
                            <div>Form Editor Content</div>
                        </VerticalLayout>
                    )}
                    {selectedEditor === "codeEditor" && (
                        <VerticalLayout className={'code-editor-layout w-full h-full'}>
                            <div>Code Editor Content</div>
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                value={code}
                                onChange={setCode}
                                name="code-editor"
                                fontSize={14}
                                lineHeight={19}
                                width={'100%'}
                                height={'100%'}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}
                            />
                        </VerticalLayout>
                    )}
                </VerticalLayout>
            </HorizontalLayout>
        </VerticalLayout>
    );
}
export default RcsView;