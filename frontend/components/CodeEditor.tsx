import {useEffect, useState} from "react";
import hljs from "highlight.js/lib/core";
import 'highlight.js/styles/atom-one-dark.css'
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
                width: '100%',
                height: '100%',
                fontFamily: 'monospace',
                fontSize: '16px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
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