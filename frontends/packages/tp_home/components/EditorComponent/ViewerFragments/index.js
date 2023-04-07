import { useState } from 'react';

import ViewerParagraph from './paragraph';
import ViewerHeading from './heading';
import ViewerLists from './lists';

const EditorViewerFragmentsWrapper = ({termsLanguages}) => {
    if (!termsLanguages[0].termsData || !termsLanguages[0].termsData.blocks) {
        return null;
    }

    const processBlockType = (blockJson) => {

        switch(blockJson.type) {
            case "header": return <ViewerHeading key={blockJson.id} paragraphData={blockJson.data}/>;
            case "paragraph": return <ViewerParagraph key={blockJson.id} paragraphData={blockJson.data}/>;
            case "list": return <ViewerLists key={blockJson.id} listsData={blockJson.data}/>;
            default: return <></>;
        }
    }

    return (
        <>
            {termsLanguages[0].termsData && termsLanguages[0].termsData.blocks.map((block) => {
                return (
                    processBlockType(block)
                )
            })}
        </>
    );
}

export default EditorViewerFragmentsWrapper;