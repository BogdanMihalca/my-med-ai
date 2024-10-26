'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MedicalHistory {
  id: number;
  patientId: number;
  specialistId?: number | null;
  date: string;
  eventType: string;
  description: string;
  provider: string;
  notes?: string | null;
}

interface Specialist {
  id: number;
  name: string;
  specialty: string;
  contact: string;
  email: string;
  address: string;
}

interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  email: string;
  lifestyleFactors?: string | null;
  socialHistory?: string | null;
  familyMemberDisease?: string | null;
  medicalHistory: MedicalHistory[];
  specialists: Specialist[];
}

export const patients: Patient[] = [
  {
    id: 1,
    name: 'John Doe',
    dateOfBirth: '1985-02-14T00:00:00Z',
    gender: 'Male',
    address: '123 Main St, Anytown, USA',
    phoneNumber: '+1234567890',
    email: 'johndoe85@example.com',
    lifestyleFactors: 'Average, Balanced diet, Occasionally active',
    socialHistory: 'Non-smoker, Social drinker, No drug use',
    familyMemberDisease: 'Heart Disease, Diabetes',
    medicalHistory: [
      {
        id: 1,
        patientId: 1,
        specialistId: 3,
        date: '2023-05-15T00:00:00Z',
        eventType: 'Checkup',
        description: 'Annual checkup with blood tests and general assessment.',
        provider: 'Dr. Smith',
        notes:
          'Slight increase in cholesterol levels, recommended diet adjustments.',
      },
      {
        id: 2,
        patientId: 1,
        specialistId: 2,
        date: '2021-12-10T00:00:00Z',
        eventType: 'Cardiology Consultation',
        description: 'Consultation due to family history of heart disease.',
        provider: 'Dr. Lang',
        notes: 'Scheduled for further tests.',
      },
    ],
    specialists: [
      {
        id: 2,
        name: 'Dr. Lang',
        specialty: 'Cardiology',
        contact: '+9876543210',
        email: 'drlang@clinic.com',
        address: 'Heart Care Center, 456 Cardio Ave, Metropolis',
      },
      {
        id: 3,
        name: 'Dr. Smith',
        specialty: 'General Medicine',
        contact: '+1234567890',
        email: 'drsmith@healthcenter.com',
        address: 'Health Center, 123 Wellness Rd, Anytown',
      },
    ],
  },
];

const data: Patient[] = patients; // Assigning JSON data

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'lifestyleFactors',
    header: 'Lifestyle Factors',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('lifestyleFactors')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Medical History',
    accessorFn: (row) => row.medicalHistory[0].description,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'notes',
    header: 'Medical History Notes',
    accessorFn: (row) => row.medicalHistory[0].notes,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('notes')}</div>
    ),
  },
  {
    accessorKey: 'socialHistory',
    header: ({}) => <Button variant='ghost'>Social History</Button>,
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('socialHistory')}</div>
    ),
  },
  {
    accessorKey: 'familyMemberDisease',
    header: ({}) => <Button variant='ghost'>Family Member Disease</Button>,
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('familyMemberDisease')}</div>
    ),
  },
];

export function PatientTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='overflow-hidden rounded border-2 border-slate-500  shadow-lg  p-2'>
      <Table className='w-full'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
