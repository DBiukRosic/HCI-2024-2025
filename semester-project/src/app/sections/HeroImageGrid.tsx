import Image from "next/image";

export type HeroImageObject = {
  image: string;
  borderRadius: string;
};

type HeroImageGridProps = { images: HeroImageObject[] };

function normalizeUrl(url: string) {
  if (url.startsWith("//")) return "https:" + url;
  return url;
}

const HeroImageGrid = ({ images }: HeroImageGridProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full max-w-sm mx-auto lg:max-w-none">
      {images.map((imageObj, index) => {
        const src = normalizeUrl(imageObj.image);

        return (
          <div
            key={index}
            className="
              relative 
              h-32 w-full     /* small on mobile */
              sm:h-40        
              md:h-48        
              lg:h-64 lg:w-80  /* bigger on desktop */
              overflow-hidden
            "
            style={{ borderRadius: imageObj.borderRadius }}
          >
            <Image
              src={src}
              alt={`Hero image ${index + 1}`}
              fill
              className="
                object-cover
                transition-transform duration-500 ease-in-out
                hover:scale-110
                "
              sizes="(min-width:1280px) 20rem, (min-width:1024px) 50vw, 100vw"
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroImageGrid;


