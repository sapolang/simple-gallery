'use client';
import { ImageData } from '@/app/types';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Image from 'next/image';
import { FaComment, FaHeart } from 'react-icons/fa';
import styles from './Gallery.module.css';
import loadingStyle from '@/components/gallery/Loading.module.css'

const Gallery = ({ initialData = [] }: { initialData: ImageData[] }) => {

  const { images, loading } = useInfiniteScroll();
  const combinedImages = [...initialData, ...images];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Gallery</h1>
      <div className={styles.gallery}>
        {combinedImages.map((image) => (
          <div key={image.id} className={styles['image-card']}>
            <Image src={image.download_url} alt={image.author} width={image.width} height={image.height} loading="lazy" />
            <div className={styles.overlay}>
              <div className={styles.icon}>
                <FaHeart /> {image.likes}
              </div>
              <div className={styles.icon}>
                <FaComment /> {image.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="sentinel" style={{ height: "1px" }}></div>
      {loading && <div className={loadingStyle.loading}></div>}
    </div>
  );
};

export default Gallery;