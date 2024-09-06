import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-dark.css'

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState<string>('');

    const highlight = (code: string) => Prism.highlight(code, Prism.languages.jsx, 'jsx');

    const handlePaste = (event: React.ClipboardEvent) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        const sanitizedText = text.replace(/[\u200B-\u200D\uFEFF]/g, ''); // Remove zero-width characters
        const target = event.currentTarget as HTMLTextAreaElement;
        const newCode = code.slice(0, target.selectionStart) + sanitizedText + code.slice(target.selectionEnd);
        setCode(newCode);
    };

    return (
        <Editor
            value={code}
            onValueChange={(code: string) => setCode(code)}
            highlight={highlight}
            padding={10}
            onPaste={handlePaste}
            autoFocus={true}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                width: '100%',
                height: '100%',
                backgroundColor: '#1e1e1e', // VS Code dark theme background color
                color: '#d4d4d4', // VS Code dark theme text color
                overflow: "auto",
            }}
        />
    );
};

export default CodeEditor;
