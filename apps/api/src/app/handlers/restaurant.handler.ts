export const createRestaurant = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Restaurant created successfully',
    data: null,
  });
};
