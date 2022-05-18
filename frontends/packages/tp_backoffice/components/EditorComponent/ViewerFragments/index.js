import { useState } from 'react';

import ViewerParagraph from './paragraph';
import ViewerHeading from './heading';
import ViewerLists from './lists';

const EditorViewerFragmentsWrapper = ({termsLanguages}) => {
    const [editorJson, setEditorJson] = useState(termsLanguages[0].termsData);

    if (!editorJson || !editorJson.blocks) {
        return null;
    }

    const processBlockType = (blockJson) => {
        console.log(blockJson);

        switch(blockJson.type) {
            case "header": return <ViewerHeading key={blockJson.id} paragraphData={blockJson.data}/>;
            case "paragraph": return <ViewerParagraph key={blockJson.id} paragraphData={blockJson.data}/>;
            case "list": return <ViewerLists key={blockJson.id} listsData={blockJson.data}/>;
            default: return <></>;
        }
    }

    return (
        <>
            {editorJson && editorJson.blocks.map((block) => {
                return (
                    processBlockType(block)
                )
            })}
        </>
    );
}

export default EditorViewerFragmentsWrapper;