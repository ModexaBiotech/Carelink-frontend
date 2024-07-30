// types.ts
export interface Vital {
  vital: string;
  parameter: string;
  addedBy: string;
  time: string;
  date: string;
}

export interface Test {
  test: string;
  results: string;
  addedBy: string;
  time: string;
  date: string;
}

export interface Prescription {
  drugName: string;
  route: string;
  frequency: string;
  dose: string;
  unit: string;
  startDate: string;
  endDate: string;
  quantity: string;
  instructions: string;
  date: string;
}

export interface Result {
  id: number;
  name: string;
  studentID: string;
  indexNo: string;
  class: string;
  age: number;
  sex: string;
  dob: string;
  bloodGroup: string;
  allergies: string;
  status: string;
  contact: string;
  email: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  emergencyContactEmail: string;
  vitals: Vital[][];
  tests: Test[][];
  prescriptions: Prescription[];
  consultationNotes: string[];
}

export interface CommentProps {
  username: string;
  comment: string;
  userProfileImage: string;
  replies?: CommentProps[];
}

export interface LabOrder {
  id: string;
  orderDate: string;
  orderingPhysician: string;
  priority: string;
  specimen: string;
  testName: string;
  diagnosis: string;
  instructions: string;
  result: string;
  time: string;

}

export interface ReferralOrder {
  patientName: string;
  patientId: string;
  dateOfBirth: string;
  gender: string;
  referralDate: string;
  referringPhysician: string;
  specialty: string;
  subSpecialty: string;
  reasonForReferral: string;
  clinicalHistory: string;
  currentMedications: string;
  locationOfOrganization: string;
  preferredFacility: string;
  otherFacility: string;
}

export interface ClosedSession {
  id: number;
  name: string;
  age: number;
  sex: string;
  organization: string;
  date: string;
  time: string;
  duration: string;
  doctor: string;
  sessionType: string;
  symptoms: string;
  consultationNotes: string;
  diagnosis: string;
  prescription: string;
  followUpInstructions: string;
  attachments: {
    name: string;
    url: string;
  }[];
  additionalNotes: string;
}

export interface VitalsData {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  temperature: string;
  temperatureDevice: string;
  weight: string;
  weightUnit: string;
  spo2: string;
  spo2Device: string;
  bloodGlucose: string;
  pulse: string;
}

export type Note = {
  title: string;
  content: string;
  date: string;
};

export interface LoginInputProps {
  school: string;
  graduation: string;
  email: string;
  password: string;
}

export interface RegisterInputProps {
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface Forum {
  id: string;
  title: string;
  posts: string;
  members: string;
  image: { src: string; width: number; height: number };
  description: string;
}