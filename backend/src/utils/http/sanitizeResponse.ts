export function sanitizeResponseBody(body: any) {
  if (Array.isArray(body)) {
    body.forEach((b) => sanitize(b));
    return;
  } else if (typeof body !== "object") {
    return body;
  } else {
    sanitize(body);
  }
}
function sanitize(body) {
  delete body.updatedAt;
  delete body.isDeleted;
  delete body.createdAt;
}
