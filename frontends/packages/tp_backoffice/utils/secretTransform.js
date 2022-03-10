
export default function SecretTransform(textToTransform, evaluationText) {
    if (evaluationText) {
        const text = evaluationText.toLowerCase();
        const CONTAINS_REGEXP = /secret|password/;

        if(CONTAINS_REGEXP.test(text)) {
            let valueTransformed= '';
            for (var i = 0; i < 10; i++) {
                valueTransformed += '*';
            }
            return valueTransformed;
        } else {
            return textToTransform;
        }
    } else {
        return textToTransform;
    }
}