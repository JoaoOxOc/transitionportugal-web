import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { 
    Grid,
    Button, 
    Divider
} from '@mui/material';
const ReactEditorJS = createReactEditorJS();

const EditorComponent = ({editorTranslations, editorTools, readOnly, editorData, editorPlaceholder, sendEditBlocks}) => {

    const editorBlocks = editorData ? {time: editorData.time, blocks: editorData.blocks} : null;
    const editorCore = useRef(null);
    if (editorCore.current && editorCore.current._editorJS && editorCore.current._editorJS.configuration) {
        editorCore.current._editorJS.isReady
            .then(() => {
                if (!editorBlocks || editorBlocks.blocks.length < 1) {
                    editorCore.current._editorJS.configuration.data = null;
                    editorCore.current._editorJS.clear();
                }
                else if (editorBlocks && (!editorCore.current._editorJS.configuration.data || editorCore.current._editorJS.configuration.data.time != editorBlocks.time)) {
                    //editorCore.current._editorJS.clear();
                    editorCore.current._editorJS.configuration.data = editorBlocks;
                    editorCore.current._editorJS.render(editorBlocks);
                }
            });
    }

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance;
    },[]);

    const handleSave = useCallback(async() => {
        const savedData = await editorCore.current.save();
        console.log("saved", savedData);
        sendEditBlocks(savedData);
    }, [sendEditBlocks])

    return (
        <>
        <ReactEditorJS 
                    tools={editorTools} data={!editorCore.current || !editorCore.current._editorJS ? editorBlocks : null}
                    onChange={handleSave} readOnly={readOnly}
                    onInitialize={handleInitialize}
                    placeholder={editorPlaceholder}/>
            {/* <Divider />
            <Grid direction="row" container justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <Button
                            sx={{
                                maxWidth: '300px !important'
                            }}
                            color="secondary"
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={handleSave}
                            >
                            {editorTranslations.misc.saveButton}
                    </Button>
                </Grid>
            </Grid> */}
        </>
    );
}

export default EditorComponent