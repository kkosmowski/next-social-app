function ensureVariable(name: string, variable: string | undefined): string {
  if (variable) return variable;
  throw new Error(`${name} is not defined.`);
}

export default ensureVariable;
