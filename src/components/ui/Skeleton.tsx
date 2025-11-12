import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton = ({ className = '', count = 1 }: SkeletonProps) => {
  const skeletons = Array(count).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut' 
            } 
          }}
          className={`bg-gray-700 rounded-md ${className}`}
        />
      ))}
    </>
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-dark-700 rounded-xl p-4">
    <Skeleton className="w-full h-48 rounded-lg mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-10 w-24 rounded-lg" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="h-[80vh] w-full bg-dark-800 rounded-xl overflow-hidden">
    <div className="container mx-auto h-full flex items-center px-4">
      <div className="max-w-2xl">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-dark-700 p-6 rounded-xl flex flex-col items-center">
        <Skeleton className="w-12 h-12 rounded-full mb-3" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);
