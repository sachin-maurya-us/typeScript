import authDirectiveTransformer from "./auth-directive";

// Define the type for your directives object
interface Directives {
  [key: string]: (schema: any, directiveName: string) => any;
}

const directivesObj: Directives = {
  auth: authDirectiveTransformer,
};

const applyDirective = (schema: any) => {
  for (const directive in directivesObj) {
    schema = directivesObj[directive](schema, directive);
  }
  return schema;
};

export default applyDirective;
