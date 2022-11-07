export const ErrorFormat = (erors: Record<string, string>[]) => {
  const errors: Record<string, string> = {};
  erors.map(({field, message}) => (errors[field] = message));
  return errors;
};
