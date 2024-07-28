"use client"; // Add this line at the top

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import SearchBar from '@/components/EHR/SearchBar';
import SearchResults from '@/components/EHR/SearchResults';
// import PatientDetails from '@/components/EHR/PatientDetails';
import { Result } from '@/types/types';

interface Notification {
  message: string;
  time: string;
  type: 'doctor' | 'forum' | 'other';
  profileName: string;

}

interface Note {
id: string;
content: string;
createdAt: string;

}

interface LoginInfo {
loginAs: string;
userType: string;
organization: string;
loginTime: string;
lastLogin: string;
}




const dummyResults: Result[] = [
  {
    id: 1,
    name: 'Elisha Mensa',
    studentID: 'STJ781666',
    indexNo: 'UE48881888',
    class: 'Year 3',
    age: 23,
    sex: 'Male',
    dob: '10-09-2000',
    bloodGroup: 'O+',
    allergies: 'N/A',
    status: 'Active',
    contact: '+233 54 227 2456',
    email: 'elisha@email.com',
    emergencyContactName: 'Mary Mensa',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 2456',
    emergencyContactEmail: 'mary@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '125/80 mmHg', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'Pulse', parameter: '62 BPM', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'SPO2', parameter: '91%', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'Temperature', parameter: '34°C', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'Weight', parameter: '60 KG', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { test: 'Genotype (RDT)', results: 'B+', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 2,
    name: 'Nana Griffiths',
    studentID: 'STJ781667',
    indexNo: 'UE43881888',
    class: 'Year 1',
    age: 20,
    sex: 'Male',
    dob: '10-09-2002',
    bloodGroup: 'A+',
    allergies: 'Banana',
    status: 'Active',
    contact: '+233 54 227 2336',
    email: 'nana@email.com',
    emergencyContactName: 'Abena Mary',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 2456',
    emergencyContactEmail: 'abena@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '125/80 mmHg', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'Pulse', parameter: '62 BPM', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'SPO2', parameter: '91%', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'Temperature', parameter: '34°C', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { vital: 'Weight', parameter: '60 KG', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
        { test: 'Genotype (RDT)', results: 'B+', addedBy: 'Kofi Mensah', time: '04:25', date: '09-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 3,
    name: 'Emefa Duah',
    studentID: 'STJ781668',
    indexNo: 'UE49881888',
    class: 'Year 2',
    age: 21,
    sex: 'Female',
    dob: '15-11-2002',
    bloodGroup: 'B+',
    allergies: 'Peanuts',
    status: 'Active',
    contact: '+233 54 227 1234',
    email: 'emefa@email.com',
    emergencyContactName: 'John Duah',
    emergencyContactRelation: 'Father',
    emergencyContactNumber: '+233 54 227 1234',
    emergencyContactEmail: 'john@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '120/75 mmHg', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
        { vital: 'Pulse', parameter: '70 BPM', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
        { vital: 'SPO2', parameter: '95%', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
        { vital: 'Temperature', parameter: '36°C', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
        { vital: 'Weight', parameter: '55 KG', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
        { test: 'Genotype (RDT)', results: 'B+', addedBy: 'Ama Kofi', time: '03:30', date: '09-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 4,
    name: 'Justina Abbey',
    studentID: 'STJ781669',
    indexNo: 'UE50881888',
    class: 'Year 3',
    age: 22,
    sex: 'Female',
    dob: '18-05-2001',
    bloodGroup: 'O-',
    allergies: 'Dust',
    status: 'Active',
    contact: '+233 54 227 5678',
    email: 'justina@email.com',
    emergencyContactName: 'Lucy Abbey',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 5678',
    emergencyContactEmail: 'lucy@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '130/85 mmHg', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
        { vital: 'Pulse', parameter: '75 BPM', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
        { vital: 'SPO2', parameter: '96%', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
        { vital: 'Temperature', parameter: '37°C', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
        { vital: 'Weight', parameter: '58 KG', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
        { test: 'Genotype (RDT)', results: 'O-', addedBy: 'Kojo Asare', time: '11:00', date: '10-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 5,
    name: 'Compson Elvis',
    studentID: 'STJ781670',
    indexNo: 'UE51881888',
    class: 'Year 1',
    age: 19,
    sex: 'Male',
    dob: '25-08-2004',
    bloodGroup: 'AB+',
    allergies: 'None',
    status: 'Active',
    contact: '+233 54 227 7890',
    email: 'compson@email.com',
    emergencyContactName: 'Ama Elvis',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 7890',
    emergencyContactEmail: 'ama@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '115/70 mmHg', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
        { vital: 'Pulse', parameter: '68 BPM', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
        { vital: 'SPO2', parameter: '94%', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
        { vital: 'Temperature', parameter: '36.5°C', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
        { vital: 'Weight', parameter: '63 KG', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
        { test: 'Genotype (RDT)', results: 'AB+', addedBy: 'Yaw Badu', time: '09:00', date: '11-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 6,
    name: 'Bernard Djangbah',
    studentID: 'STJ781671',
    indexNo: 'UE52881888',
    class: 'Year 2',
    age: 22,
    sex: 'Male',
    dob: '07-07-2001',
    bloodGroup: 'B-',
    allergies: 'Shellfish',
    status: 'Active',
    contact: '+233 54 227 5671',
    email: 'bernard@email.com',
    emergencyContactName: 'Jane Djangbah',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 5671',
    emergencyContactEmail: 'jane@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '122/78 mmHg', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
        { vital: 'Pulse', parameter: '72 BPM', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
        { vital: 'SPO2', parameter: '93%', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
        { vital: 'Temperature', parameter: '37.2°C', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
        { vital: 'Weight', parameter: '70 KG', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
        { test: 'Genotype (RDT)', results: 'B-', addedBy: 'Efua Kofi', time: '10:45', date: '12-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 7,
    name: 'Rawgie Gyabaah',
    studentID: 'STJ781672',
    indexNo: 'UE53881888',
    class: 'Year 4',
    age: 24,
    sex: 'Male',
    dob: '03-02-2000',
    bloodGroup: 'O+',
    allergies: 'None',
    status: 'Active',
    contact: '+233 54 227 8910',
    email: 'rawgie@email.com',
    emergencyContactName: 'Esi Gyabaah',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 8910',
    emergencyContactEmail: 'esi@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '118/75 mmHg', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
        { vital: 'Pulse', parameter: '65 BPM', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
        { vital: 'SPO2', parameter: '92%', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
        { vital: 'Temperature', parameter: '35.8°C', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
        { vital: 'Weight', parameter: '68 KG', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
        { test: 'Genotype (RDT)', results: 'O+', addedBy: 'Aba Kwesi', time: '13:20', date: '13-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 8,
    name: 'Romeo Kodua',
    studentID: 'STJ781673',
    indexNo: 'UE54881888',
    class: 'Year 3',
    age: 23,
    sex: 'Male',
    dob: '19-10-2000',
    bloodGroup: 'A+',
    allergies: 'None',
    status: 'Active',
    contact: '+233 54 227 8911',
    email: 'romeo@email.com',
    emergencyContactName: 'Ama Kodua',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 8911',
    emergencyContactEmail: 'ama@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '120/80 mmHg', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
        { vital: 'Pulse', parameter: '60 BPM', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
        { vital: 'SPO2', parameter: '90%', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
        { vital: 'Temperature', parameter: '36.1°C', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
        { vital: 'Weight', parameter: '70 KG', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
        { test: 'Genotype (RDT)', results: 'A+', addedBy: 'Kojo Mensah', time: '08:00', date: '14-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 9,
    name: 'Kwesi Opoku',
    studentID: 'STJ781674',
    indexNo: 'UE55881888',
    class: 'Year 2',
    age: 21,
    sex: 'Male',
    dob: '11-12-2002',
    bloodGroup: 'B+',
    allergies: 'Milk',
    status: 'Active',
    contact: '+233 54 227 8912',
    email: 'kwesi@email.com',
    emergencyContactName: 'Esi Opoku',
    emergencyContactRelation: 'Mother',
    emergencyContactNumber: '+233 54 227 8912',
    emergencyContactEmail: 'esi@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '117/75 mmHg', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
        { vital: 'Pulse', parameter: '65 BPM', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
        { vital: 'SPO2', parameter: '92%', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
        { vital: 'Temperature', parameter: '35.9°C', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
        { vital: 'Weight', parameter: '65 KG', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
        { test: 'Genotype (RDT)', results: 'B+', addedBy: 'Yaw Kofi', time: '07:30', date: '15-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 10,
    name: 'Anastasia Darko',
    studentID: 'STJ781675',
    indexNo: 'UE56881888',
    class: 'Year 3',
    age: 22,
    sex: 'Female',
    dob: '29-03-2002',
    bloodGroup: 'AB-',
    allergies: 'Cats',
    status: 'Active',
    contact: '+233 54 227 8913',
    email: 'anastasia@email.com',
    emergencyContactName: 'Kwame Darko',
    emergencyContactRelation: 'Father',
    emergencyContactNumber: '+233 54 227 8913',
    emergencyContactEmail: 'kwame@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '124/80 mmHg', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
        { vital: 'Pulse', parameter: '72 BPM', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
        { vital: 'SPO2', parameter: '94%', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
        { vital: 'Temperature', parameter: '36.7°C', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
        { vital: 'Weight', parameter: '60 KG', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
        { test: 'Genotype (RDT)', results: 'AB-', addedBy: 'Ama Boakye', time: '12:15', date: '16-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 11,
    name: 'Abigail Opoku',
    studentID: 'STJ781676',
    indexNo: 'UE57881888',
    class: 'Year 4',
    age: 24,
    sex: 'Female',
    dob: '17-06-2000',
    bloodGroup: 'O-',
    allergies: 'None',
    status: 'Active',
    contact: '+233 54 227 8914',
    email: 'abigail@email.com',
    emergencyContactName: 'Yaw Opoku',
    emergencyContactRelation: 'Father',
    emergencyContactNumber: '+233 54 227 8914',
    emergencyContactEmail: 'yaw@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '110/70 mmHg', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
        { vital: 'Pulse', parameter: '60 BPM', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
        { vital: 'SPO2', parameter: '93%', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
        { vital: 'Temperature', parameter: '35.5°C', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
        { vital: 'Weight', parameter: '62 KG', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
        { test: 'Genotype (RDT)', results: 'O-', addedBy: 'Nana Mensah', time: '14:45', date: '17-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },

  {
    id: 12,
    name: 'Nana Agyeang',
    studentID: 'STJ781677',
    indexNo: 'UE58881888',
    class: 'Year 2',
    age: 21,
    sex: 'Male',
    dob: '13-09-2002',
    bloodGroup: 'B+',
    allergies: 'None',
    status: 'Active',
    contact: '+233 54 227 8915',
    email: 'nana.agyeang@email.com',
    emergencyContactName: 'Kwesi Agyeang',
    emergencyContactRelation: 'Father',
    emergencyContactNumber: '+233 54 227 8915',
    emergencyContactEmail: 'kwesi.agyeang@email.com',
    vitals: [
      [
        { vital: 'Blood Pressure', parameter: '115/72 mmHg', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
        { vital: 'Pulse', parameter: '68 BPM', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
        { vital: 'SPO2', parameter: '94%', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
        { vital: 'Temperature', parameter: '36.6°C', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
        { vital: 'Weight', parameter: '68 KG', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
      ],
    ],
    tests: [
      [
        { test: 'Malaria (RDT)', results: 'Negative', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
        { test: 'Typhoid (RDT)', results: 'Negative', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
        { test: 'Genotype (RDT)', results: 'B+', addedBy: 'Yaw Kofi', time: '16:00', date: '18-02-2024' },
      ],
    ],
    prescriptions: [],
    consultationNotes: ['Initial consultation - Patient showing signs of improvement.', 'Follow-up consultation - No new symptoms.'],
  },
];


const EHRPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Result | null>(null);
  const [notifications, setNotifications] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    loginAs: "Dr. Lorant Amo Kodieh",
    userType: "Physician",
    organization: "Modexa Biotech",
    loginTime: "2024-07-27T10:00:00Z",
    lastLogin: "2024-07-26T15:30:00Z"
  });


  const handleSearch = (query: string) => {
    setQuery(query);
    const filteredResults = dummyResults.filter(
      (result) =>
        result.name.toLowerCase().includes(query.toLowerCase()) ||
        result.studentID.toLowerCase().includes(query.toLowerCase()) ||
        result.indexNo.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleCollapseChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handlePatientClick = (patient: Result) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onCollapseChange={handleCollapseChange} />
      <div className={`flex-1 flex flex-col bg-gray-100 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-48'}`}>
        <div className="flex-1 flex p-6 overflow-auto">
          <div className="flex-1 max-w-full">
            {!selectedPatient ? (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">EHR</h1>
                <SearchBar onSearch={handleSearch} />
                <SearchResults query={query} results={results} onPatientClick={handlePatientClick} />
              </div>
            ) : (
              //<PatientDetails patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
              <h1>Hello</h1>
            )}
          </div>
        </div>
      </div>
      <RightSidebar notifications={notifications}  loginInfo={loginInfo} />
    </div>
  );
};

export default EHRPage;