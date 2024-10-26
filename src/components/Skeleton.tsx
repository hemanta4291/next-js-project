type SkeletonPropType = {
  length: number;
  skHeight?: string;
  skWidth?: string;
};

const Skeleton: React.FC<SkeletonPropType> = ({
  length = 20,
  skHeight = "100px",
  skWidth = "100%",
}) => (
  <>
    {Array.from({ length }, (_, index) => (
      <div
        key={index}
        className={`bg-gray-300 rounded-md animate-pulse w-full`}
        style={{
          height: skHeight ? `${skHeight}` : "auto",
          width: skWidth ? `${skWidth}` : "auto",
        }}></div>
    ))}
  </>
);

export default Skeleton;
