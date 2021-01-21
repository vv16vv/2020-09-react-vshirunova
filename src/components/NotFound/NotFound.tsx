import React from 'react';

import {StyledButton} from "@/components/styled/StyledComponents";
import {ErrorLabel, StyledP} from "@/components/styled/StyledTextComponents";

interface NotFoundProps {
    notFoundPath: string;
    onBack: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({notFoundPath, onBack}) => {
    return (
        <>
            <StyledP>Page <ErrorLabel>{notFoundPath}</ErrorLabel> not found</StyledP>
            <StyledButton onClick={onBack}>Back</StyledButton>
        </>
    )
}

