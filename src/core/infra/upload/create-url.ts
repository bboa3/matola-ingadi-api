
interface CreateUrlProps {
  bucketName?: string
  fileName: string
}

export const createUrl = ({ bucketName, fileName }: CreateUrlProps) => {
  return `https://${bucketName}.s3.amazonaws.com/${fileName}`
}
