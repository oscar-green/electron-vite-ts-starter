// enable importing images from assets
declare module "*.gif"
declare module "*.svg"

declare module '*?worker&url' {
  const workerFactory: string;
  export default workerFactory;
}
