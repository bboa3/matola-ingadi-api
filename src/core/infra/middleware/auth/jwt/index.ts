import fs from 'fs'
import { importSPKI, jwtVerify } from 'jose'

interface VerifyProps {
  token?: string
}

const algorithm = 'RS256'
const spki = fs.readFileSync('./public.pem', { encoding: 'utf-8' })

export async function verifyJWT ({ token }: VerifyProps) {
  const publicKey = await importSPKI(spki, algorithm)

  const { payload } = await jwtVerify(
    token || '',
    publicKey,
    {
      issuer: 'urn:ui-me:issuer',
      audience: 'urn:mozeconomia:audience',
      algorithms: [algorithm]
    }
  )

  return payload
}
