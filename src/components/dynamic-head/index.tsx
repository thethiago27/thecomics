import Head from "next/head";

interface DynamicHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const DynamicHead = ({ title, description, image, url }: DynamicHeadProps) => {
  return (
    <Head>
      <title>{`The Comics ${title}`}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={
          url
            ? `https://thecomics-seven.vercel.app/${url}`
            : `https://thecomics-seven.vercel.app/`
        }
      />
      <meta property="og:title" content={`The Comics | ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://thecomics-seven.vercel.app/"
      />
      <meta property="twitter:title" content={`The Comics | ${title}`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default DynamicHead;
