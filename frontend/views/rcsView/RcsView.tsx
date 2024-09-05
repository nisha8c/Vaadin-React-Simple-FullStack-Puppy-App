import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import MessageTypeAndAllTemplatesColumn from "Frontend/views/rcsView/MessageTypeAndAllTemplatesColumn";
import { RadioButton } from "@hilla/react-components/RadioButton";
import { RadioGroup } from "@hilla/react-components/RadioGroup";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript"; // Ensure this is imported
import 'prismjs/themes/prism-tomorrow.css';

const RcsView = () => {
    const [selectedEditor, setSelectedEditor] = useState("formEditor");
    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
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
                            <Editor
                                value={code}
                                onValueChange={code => setCode(code)}
                                insertSpaces={true}
                                highlight={code => Prism.highlight(code, Prism.languages.html, 'html')}
                                padding={10}
                                tabSize={2}
                                autoFocus={true}
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 14,
                                    width: '100%',
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
