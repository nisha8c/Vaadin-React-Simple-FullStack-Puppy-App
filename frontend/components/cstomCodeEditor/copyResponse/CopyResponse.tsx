import CopyContext from "Frontend/components/cstomCodeEditor/context/CopyContext";
import { withSystemProps } from "@modjs/utils";
import { styled } from "styled-components";
import {forwardRef, ReactNode, Ref, useContext} from "react";
import {Box} from "@modjs/core";

interface ModCopyResponseProps {
    children: ReactNode;
    ref?: Ref<HTMLElement>;
    isOpen?: boolean;
}

const forwardProps = (prop: string) => !['isOpen'].includes(prop);

const ModCopyResponse = styled.div.withConfig({
    shouldForwardProp: prop => forwardProps(prop),
})<ModCopyResponseProps>`
    width: fit-content;
    height: fit-content;
    background-color: ${props => props.theme.mode};
    border: ${props => props.isOpen && props.theme.borderRadius};
`;

const CopyResponse = ({ children, ref, ...props }: ModCopyResponseProps) => {
    const { isOpen } = useContext(CopyContext);
    return (
        <ModCopyResponse
            {...props}
            ref={ref}
            isOpen={isOpen}
            data-test = 'copy-response'
        >
            {isOpen && <Box px={8}>{children}</Box>}
        </ModCopyResponse>
    );
}

export default withSystemProps(forwardRef(CopyResponse));