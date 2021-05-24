export const apiConstant = {
  /** Endpoints */
  appointmentEndpoint: 'http://52.224.123.133:8082/',
  authenticationEndpoint: 'http://52.224.123.133:8080/',
  visitAndPatientEndpoint: 'http://52.224.123.133:8082/',
  diagnosisEndpoint: 'http://13.90.116.138:8081/',
  procedureEndpoint: 'http://13.90.116.138:8080/',
  medicationEndpoint: 'http://40.76.198.123:8080/',
  inboxEndpoint: 'http://40.76.198.123:',
  vitalEndpoint : 'http://52.188.201.41:8080/',
  /**Appointment Calls */
  appointmentList : 'appointment/byuseridandwithindate',
  appointmentListByDate : 'appointment/byuseridanddate',
  createAppointment : 'appointment',
  editAppointment : 'appointment/{$0}',
  deleteAppointment : 'appointment/{$0}/CANCELLED',
  appointmentById : 'appointment/{$0}',
  /** Visit Calls */
  createVisit : 'healthcare/visit/createvisit/',
  getVisitById : 'healthcare/visit/myvisit/{$0}',
  /** Diagnosis Calls */
  listOfDiagnosis : 'healthcare/diagnosis/getalldiagnosis',
  diagnosisById : 'healthcare/diagnosis/{$0}',
  createDiagnosis : 'healthcare/diagnosis/diagnosisDetailDesc',
  /** Procedure Calls */
  listOfProcedures : 'healthcare/procedure/getallProcedure',
  procedureById : 'healthcare/procedure/{$0}',
  createProcedure : 'healthcare/procedure/procedureDetailDesc',
  /** Medication Calls */
  listOfMedications : 'medication/getList',
  medicationById : 'medication/getList/{$0}/{$1}',
  createMedication : 'medication/saveList',
  /** Patient Calls */
  addPatient : 'healthcare/patient/',
  patientById : 'healthcare/patient/{$0}',
  getAllPatients : 'healthcare/patient/',
  updatePatient : 'healthcare/patient/',
  listOfAllergies : 'healthcare/allergies/',
  listOfLanguages : 'healthcare/languages',
  /** Registration Calls */
  userRegistration : 'api/admin-service/registration/',
  login : 'oauth/token',
  getUserByRole : '/api/admin-service/registration/role/{$0}',
  /** Inbox Calls */
  sendMail : '8081/inboxProducer/sendRequest',
  getMail : '8082/records/get',
  /** Vital Calls */
  addVitals : 'healthcare/vitalDetails/addVitalDetails',
  getVitalsById : 'healthcare/vitalDetails/getVitalDetailById/{$0}'
}

export class ApiConstants{

  public static generateDynamicEndpoint(url : string, apiEndpointName : string, ...args){
    const endPoint = apiConstant[apiEndpointName]
    .replace('{$0}', args[0])
    .replace('{$1}',args[1]);

    return apiConstant[url] + endPoint;
  }
}