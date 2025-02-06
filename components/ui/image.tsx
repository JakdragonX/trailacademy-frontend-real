export const Image = ({ src, alt, width, height, ...props }) => (
  <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} {...props} />
)
