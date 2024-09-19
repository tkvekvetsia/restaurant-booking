export const isAdmin = user => user.role === 'admin';
export const hasPermissionForAction = (
  user: { id: string },
  recordUserId: string
) => user.id === recordUserId || isAdmin(user);
