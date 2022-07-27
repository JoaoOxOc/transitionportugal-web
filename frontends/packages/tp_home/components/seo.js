import React from 'react';
import Head from 'next/head';

export default function SEO({
  metaDataObject,
}) {
  console.log(metaDataObject);
  let metaData = [
    {
      name: `description`,
      content: metaDataObject.metaDescription,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:title`,
      content: metaDataObject.metaTitle,
    },
    {
      name: `twitter:description`,
      content: metaDataObject.metaDescription,
    },
  ]
  if (metaDataObject && metaDataObject.meta) {
    metaData = metaData.concat(metaDataObject.meta);
  }
  return (
    <Head>
      <title>{metaDataObject.metaTitle}</title>
      {metaData.map(({ name, content, property }, i) => {
        if (property) {
          return (
            <meta key={i} property={property} content={content} />
          )
        }
        else {
          return (
            <meta key={i} name={name} content={content} />
          )
        }
      })}
    </Head>
  );
}

SEO.defaultProps = {
  lang: `pt`,
  meta: [],
};
