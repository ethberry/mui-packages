import { fromBech32, fromHex, toHex, toBech32 } from "@cosmjs/encoding";

export interface IFromBech32ToHexProps {
  address: string;
}

export interface IFromHexToBech32Props {
  address: string;
  prefix: string;
}

export interface IToAnotherBech32Props {
  address: string;
  prefix: string;
}

export interface IUseAddressConverterReturn {
  fromBech32ToHex: (props: IFromBech32ToHexProps) => string;
  fromHexToBech32: (props: IFromHexToBech32Props) => string;
  toAnotherBech32: (props: IToAnotherBech32Props) => string;
}

export const useAddressConverter = (): IUseAddressConverterReturn => {
  return {
    fromBech32ToHex: ({ address }: IFromBech32ToHexProps) => {
      const data = fromBech32(address).data;
      return toHex(data);
    },
    fromHexToBech32: ({ address, prefix }: IFromHexToBech32Props) => {
      const hexAddress = address.slice(2);
      return toBech32(prefix, fromHex(hexAddress));
    },
    toAnotherBech32: ({ address, prefix }: IToAnotherBech32Props) => {
      return toBech32(prefix, fromBech32(address).data);
    },
  };
};
