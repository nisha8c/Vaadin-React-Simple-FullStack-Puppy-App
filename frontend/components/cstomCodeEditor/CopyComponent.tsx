import { withSystemProps } from "@modjs/utils";
import { CopyIcon } from "@modjs/icons";
import {forwardRef, ReactNode, Ref, RefObject, useRef, useState} from "react";
import { styled } from "styled-components";
import CopyContext from "Frontend/components/cstomCodeEditor/context/CopyContext";
import {Button} from "@hilla/react-components/Button";
import {Icon} from "@hilla/react-components/Icon";
import {Tooltip} from "@hilla/react-components/Tooltip";

interface ModCopyProps {
    children?: ReactNode;
    ref?: Ref<HTMLElement>;
    textNode: RefObject<HTMLElement> | null;
}

const forwardProps = (prop: string) => !['textNode'].includes(prop);

const ToggleCopyWrapper = styled.div`
    width: fit-content;
`;

const ModCopy = styled.div.withConfig({
    shouldForwardProp: prop => forwardProps(prop),
})<ModCopyProps>`
    padding-right: 4px;
`;

const CopyComponent = ({children, ref, textNode, ...props}: ModCopyProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const reference = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);
    const value = { isOpen, reference };

    const handleCopyToClipboard = async () => {
        if (textNode && textNode.current) {
            const text = textNode.current.textContent || '';
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            } catch (error) {
                setCopied(!copied);
            }
        }
        setIsOpen(true);
    }
    return (
        <CopyContext.Provider value={value}>
            <ModCopy {...props} ref={ref} textNode={reference} data-test = 'Copy'>
                {!copied && (
                    <ToggleCopyWrapper onClick={handleCopyToClipboard} data-testId = 'default-copy-icon'>
                        <Button theme={'tertiary-inline icon'}>
                            {'Copy'}
                            <Tooltip hoverDelay={500} slot="tooltip" text="Copy to clipboard" />
                        </Button>
                    </ToggleCopyWrapper>
                )}
                {copied && children}
            </ModCopy>
        </CopyContext.Provider>
    );
}
export default withSystemProps(forwardRef(CopyComponent))
