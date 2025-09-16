export interface IDescriptionBlock {
  htmlValue: string;
}

export interface IImageValue {
  downloadLink: string;
}

export interface IProduct {
  id: number;
  localizeInfos: {
    title: Record<string, string>;
  };
  price: number | null;
  attributeValues: {
    p_description: { value: IDescriptionBlock[] };
    p_price: { value: number };
    p_image: { value: IImageValue };
    p_title: { value: string };
  };
}
