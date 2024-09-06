import {useState} from "react";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";

const CodeEditor = () => {
    const [code, setCode] = useState('');

    return (
        <VerticalLayout className={'w-full h-full'}>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            style={{
                flex: 1,
                width: '98%',
                height: '100%',
                fontFamily: 'monospace',
                fontSize: '16px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                outline: 'none',
                resize: 'none',
                overflow: "auto",
                backgroundColor: '#1e1e1e', // VS Code dark theme background color
                color: '#d4d4d4',
              }}
          />
        </VerticalLayout>
    );
};
export default CodeEditor;