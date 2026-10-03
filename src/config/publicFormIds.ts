/**
 * IDs estables de formularios públicos consumidos por public-client.
 *
 * Los ocho formularios bootstrap se crean mediante:
 *
 *   npm run seed:public-forms
 *
 * Ninguno de estos IDs es secreto:
 * forman parte del contrato público GET/POST /api/public/forms/:formId.
 */
export const PUBLIC_FORM_IDS = Object.freeze({
  colabora: "f5d7d9ee-8a4d-407c-95b8-f34cc2f845c0",
  fairbnbCollaboration: "7a27dd9f-d90e-5fa7-8173-0933405cbb28",
  webrtcCourseRegistration: "6b4bc699-cf2d-5060-9612-0b9232e8b227",
  spatialCourseRegistration: "b25a0aa3-18fb-5430-b691-454bde08cda0",
  inclusiveCultureTeacher: "6aec6c9c-c1f0-5abd-9ad4-38f23bcedb1e",
  inclusiveCultureStudent: "411398f2-febf-5957-82d9-0e0ac1f168e3",
  alternativeEducationRetiredTeacher: "0f41a062-4806-5b7f-a5c4-77f866d7749b",
  alternativeEducationStudent: "ca9b0309-018c-525c-9153-f020bb666d8c",
} as const);

export type PublicFormKey = keyof typeof PUBLIC_FORM_IDS;
