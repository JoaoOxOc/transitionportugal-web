import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { 
    Grid, 
    InputLabel,
    Button, 
    FormControl, 
    TextField, 
    Slide,
    Divider,
    FormControlLabel,
    FormHelperText,
    CircularProgress,
    Typography,
    Card,
    styled,
    Alert
} from '@mui/material';

const EditorComponent = ({editorTranslations, editorTools, editorData, editorPlaceholder, sendEditBlocks}) => {
    console.log(editorTranslations);
    const ReactEditorJS = createReactEditorJS();

    const editorCore = useRef(null);

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance;
    }, [])

    const handleSave = useCallback(async() => {
        const savedData = await editorCore.current.save();
        sendEditBlocks(savedData);
    }, [sendEditBlocks])

    return (
        <>
        <ReactEditorJS 
                    tools={editorTools} data={editorData}
                    onInitialize={handleInitialize}
                    placeholder={editorPlaceholder}/>
            <Divider />
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
            </Grid>
        </>
    );
}

export default EditorComponent