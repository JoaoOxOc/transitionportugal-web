import parse from 'html-react-parser';

export default function DynamicSectionContent({sectionContent,sectionIndex}) {
    const parseDynamicSection = (dynamicContent, index) => {
        const options = {
            replace: domNode => {
              if (domNode.attribs && domNode.attribs.href) {
                domNode.attribs.target = '_blank';
              }
              if (domNode.name === 'oembed') {
                console.log(domNode)
                return <embed src={domNode.attribs.url}></embed>;
              }
            }
        };
        return (
                <div key={index}>
                    {parse(dynamicContent, options)}
                </div>
        );
    }

    return (
        parseDynamicSection(sectionContent,sectionIndex)
    );
}