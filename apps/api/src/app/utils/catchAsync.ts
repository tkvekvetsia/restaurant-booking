export const catchAsync = (fn: (req, res, next) => Promise<any>) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
