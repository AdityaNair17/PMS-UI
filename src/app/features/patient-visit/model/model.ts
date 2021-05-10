export interface Imedication {
  medicineName : string;
  dosage : string;
  description : string;
}

export interface IProcedure {
  procedureId : string,
  procedureName : string
}

export interface IDiagnosis {
  diagnosisId : string,
  diagnosisName : string
}

export interface MedicationById {
  successFlag : boolean;
  medicationOnVisit : MedicationOnVisit;
  auditInfo : any;
  timestamp? : string;
  message? : string;
  error? : string;
  stacktrace? : string;
}

export interface MedicationOnVisit {
  patientId : string;
  visitId : string;
  medication : Array<Imedication>;
}

export interface VisitDetails {
  patientId : string;
  patientName : string;
  visitId : string;
  physcianName : string;
  appointmentDate : string;
}