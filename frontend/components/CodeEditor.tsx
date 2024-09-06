import MonacoEditor from 'react-monaco-editor';

const CodeEditor = () => {
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        // Disable telemetry
        telemetry: false,
        // Disable web workers
        useWebWorkers: false,
    };

    return (
        <MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme="vs-dark"
            options={options}
        />
    );
};

export default CodeEditor;