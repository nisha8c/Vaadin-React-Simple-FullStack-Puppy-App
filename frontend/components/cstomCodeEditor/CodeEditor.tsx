import { styled } from "styled-components";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', html);

import { withSystemProps } from "@modjs/utils";
import CopyComponent from "Frontend/components/cstomCodeEditor/CopyComponent";
import CopyResponse from "Frontend/components/cstomCodeEditor/copyResponse/CopyResponse";
import Pre from 'Frontend/components/Pre';
import { SuccessIcon, SquareIcon, PlayIcon } from "@modjs/icons";
import {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";
import {Box} from "@modjs/core";

interface ModCodeProps extends HTMLAttributes<HTMLElement> {
    children?: string;
    className?: string;
    contentEditable?: boolean;
    type?: 'script' | 'code';
    fileName?: ReactNode;
    headerContent?: ReactNode;
    disableExec?: boolean;
    variant?: 'filled' | 'outlined' | 'transparent';
    notched?: boolean;
}

const forwardProps = (prop: string) =>
    ![
        'hilightedCode',
        'variant',
        'notched',
        'fileName',
        'headerContent',
    ].includes(prop);

const ModCode = styled.code.withConfig({
    shouldForwardProp: prop => forwardProps(prop),
})<ModCodeProps>`
    position: relative;
    display: block;
    letter-spacing: 1px;
    padding: 16px;
    border-right: ${props => props.theme.border.dark};
    border-bottom: ${props => props.theme.border.dark};
    border-left: ${props => props.theme.border.dark};
    font-family: ${props => props.theme.typography.ff.primary};
    font-size: ${props => props.theme.typography.fs.sm};
    color: ${props => props.theme.color.secondary};
    background-color: ${props => props.theme.color.transparent};
    ${props =>
            props.contentEditable &&
            `
                outline: none;
            `
    }
    ${props =>
            props.type === 'code' &&
            `
                height: 40vh;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: ${props.theme.scrollbarColor};
            `
    }
`;

const ModCodeHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${props => props.theme.border.dark};
    padding: 8px 8px 8px 0px;
    background-color: ${props => props.theme.mode};
`;

const CodeEditor = ({
                        children,
                        className,
                        type,
                        contentEditable,
                        variant,
                        notched,
                        fileName,
                        headerContent,
                        disableExec,
                        ...props
                    }: ModCodeProps) => {
    const codeRef = useRef<HTMLElement>(null);
    const [codeRunning, setCodeRunning] = useState(false);
    const handleCodeRun = () => {
        setCodeRunning(!codeRunning);
    }
    useEffect(() => {
        if (codeRef.current && !codeRef.current.dataset.highlighted) {
            hljs.highlightAll();
        }
    }, []);

    return (
        <Pre variant={variant} notched={notched}>
            <ModCodeHeader>
                <Box display={'flex'} gap={8} alignItems={'center'}>

                </Box>
            </ModCodeHeader>
        </Pre>
    );

}
export default withSystemProps(forwardRef(CodeEditor))
