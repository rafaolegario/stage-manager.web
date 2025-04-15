import { address } from '../@types/address'

import { Address } from '../FakeDatabase'

export async function GetAddress(internID:string): Promise<address> {
  // conexão HTTP
  const aaddress = Address.find((address) => address.internId.includes(internID))

  return aaddress as address
}
