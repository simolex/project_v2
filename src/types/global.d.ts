declare module "*.scss" {
    type ClassNames = Record<string, string>;
    const content: ClassNames;
    export default content;
}