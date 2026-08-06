declare module "heic2any" {
  interface Heic2anyOptions {
    blob: Blob;
    toType?: string;
    quality?: number;
    multiple?: boolean;
  }
  const heic2any: (options: Heic2anyOptions) => Promise<Blob | Blob[]>;
  export default heic2any;
}

declare module "mammoth/mammoth.browser" {
  const mammoth: any;
  export default mammoth;
}
