import { useState } from 'react';

import ViewerParagraph from './paragraph';

const EditorViewerFragmentsWrapper = ({termsLanguages}) => {
    const [editorJson, setEditorJson] = useState(termsLanguages[0].termsData);

    if (!editorJson || !editorJson.blocks) {
        return null;
    }

    const processBlockType = (blockJson) => {
        console.log(blockJson);

        switch(blockJson.type) {
            case "paragraph": return <ViewerParagraph key={blockJson.id} paragraphData={blockJson.data}/>; break;
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