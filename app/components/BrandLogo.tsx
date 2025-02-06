import Image from "next/image"

export default function BrandLogo() {
  return <Image src="/logo.svg" alt="Trail Academy Logo" width={100} height={40} className="object-contain" />
}
