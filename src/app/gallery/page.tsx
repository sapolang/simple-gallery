import { Suspense } from "react";
import { fetchImages } from "@/service/gallery";
import { ImageData } from "@/app/types";
import Gallery from "@/components/gallery/Gallery";
import Loading from "./loading";
const GalleryPage = async () => {
  const imageData: ImageData[] = await fetchImages({ page: 1, limit: 30 });
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Gallery initialData={imageData} />
      </Suspense>
    </>
  );
};

export default GalleryPage;