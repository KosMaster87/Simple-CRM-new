export interface User {
  id?: string; // Optional, falls Firestore automatisch IDs generiert
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  town: string;
  country: string;
  birthDate: string;
  description: string;
  role: string;
  someMoreSomething: string;
}
