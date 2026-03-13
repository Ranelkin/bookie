export type InvoiceStatus = "Bezahlt" | "Offen" | "Überfällig";
export type CustomerStatus = "Aktiv" | "Inaktiv";

export type Invoice = {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  total: string;
  status: InvoiceStatus;
};

export type Customer = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  annualRevenue: string;
  status: CustomerStatus;
};

export type Project = {
  id: string;
  name: string;
  lead: string;
  startDate: string;
  budget: string;
  progress: string;
};

export type TimeEntry = {
  id: string;
  employee: string;
  projectId: string;
  projectName: string;
  date: string;
  hours: string;
  type: string;
};

export type CreateInvoiceDTO = Omit<Invoice, "id">;
export type UpdateInvoiceDTO = Partial<CreateInvoiceDTO>;

export type CreateCustomerDTO = Omit<Customer, "id">;
export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;

export type CreateProjectDTO = Omit<Project, "id">;
export type UpdateProjectDTO = Partial<CreateProjectDTO>;

export type CreateTimeEntryDTO = Omit<TimeEntry, "id">;
export type UpdateTimeEntryDTO = Partial<CreateTimeEntryDTO>;
