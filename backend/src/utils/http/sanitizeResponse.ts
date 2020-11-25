export function sanitizeResponseBody(body: any) {
  delete body.updatedAt;
  delete body.isDeleted;
  delete body.createdAt;
}
