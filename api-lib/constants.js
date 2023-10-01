export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
    role: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  building: {
    name: { type: 'string', minLength: 1, maxLength: 280 },
  },
  floor: {
    name: { type: 'string', minLength: 1, maxLength: 280 },
    buildingId: { type: 'string', minLength: 1, maxLength: 280 },
    cameraIPs: { type: 'array', minItems: 1, uniqueItems: true },
  },
  role: {
    name: { type: 'string', minLength: 1, maxLength: 280 },
    floorAccess: { type: 'array', minItems: 1, uniqueItems: true },
  }
};
