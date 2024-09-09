import React from 'react';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import ShowLightbulbIconMode = editor.ShowLightbulbIconMode;

interface ICodeEditorProps {
    code: string;
}
const CodeEditor = ({ code }: ICodeEditorProps) => {
    return (
        <Editor
            height="70vh"
            defaultLanguage="javascript"
            defaultValue="// Start coding..."
            value={code}
            theme={'vs-dark'}
            options={{
                // Ensure no data is sent to external services
                automaticLayout: true,
                suggestOnTriggerCharacters: false,
                quickSuggestions: false,
                wordBasedSuggestions: 'off',
                parameterHints: {
                    enabled: false
                },
                lightbulb: {
                    enabled: ShowLightbulbIconMode.Off,
                },
                autoDetectHighContrast: false,
            }}
            beforeMount={(monaco) => {
                // Configure Monaco Editor to not use any external services
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                    noLib: true,
                    allowNonTsExtensions: true
                });

                // Disable all default Monaco Editor services
                monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: true,
                    noSyntaxValidation: true
                });

                // Create a local language service for JavaScript
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: true,
                    noSyntaxValidation: true,
                    noSuggestionDiagnostics: true,
                });

                // Create a local language service for JavaScript
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ES2020,
                    allowNonTsExtensions: true,
                });

                // Configure HTML language
                monaco.languages.html.htmlDefaults.setOptions({
                    data: {
                        useDefaultDataProvider: false,
                    },
                });

                // Disable external services for autosuggest
                monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ES2020,
                    allowNonTsExtensions: true,
                    noLib: true,
                    lib: []
                });

                // Disable inlay hints
                monaco.languages.typescript.javascriptDefaults.setInlayHintsOptions({
                    includeInlayParameterNameHints: 'none',
                    includeInlayParameterNameHintsWhenArgumentMatchesName: false,
                    includeInlayFunctionParameterTypeHints: false,
                    includeInlayVariableTypeHints: false,
                    includeInlayPropertyDeclarationTypeHints: false,
                    includeInlayFunctionLikeReturnTypeHints: false,
                    includeInlayEnumMemberValueHints: false,
                });

                // Create a local language service for CSS
                monaco.languages.css.cssDefaults.setOptions({
                    validate: false,
                    lint: {
                        compatibleVendorPrefixes: 'ignore',
                        vendorPrefix: 'warning',
                        duplicateProperties: 'warning',
                        emptyRules: 'warning',
                        importStatement: 'ignore',
                        boxModel: 'ignore',
                        universalSelector: 'ignore',
                        zeroUnits: 'ignore'
                    }
                });
            }}
        />
    );
};

export default CodeEditor;
