export const apiConstant = {
  /** Endpoints */
  appointmentEndpoint: 'http://40.114.53.239:8080/',
  authenticationEndpoint: 'http://40.114.53.239:8080/',
  visitAndPatientEndpoint: 'http://40.114.53.239:8080/',
  diagnosisEndpoint: 'http://13.90.116.138:8081/',
  procedureEndpoint: 'http://13.90.116.138:8080/',
  medicationEndpoint: 'http://40.76.198.123:8080/',
  inboxEndpoint: 'http://40.76.198.123:',
  vitalEndpoint : 'http://52.188.201.41:8080/',
  globalEndpoint : 'http://davita-impact.eastus.cloudapp.azure.com:8080/',
  /**Appointment Calls */
  appointmentList : 'api/patient-service/appointment/byuseridandwithindate',
  appointmentListByDate : 'api/patient-service/appointment/byuseridanddate',
  createAppointment : 'api/patient-service/appointment',
  editAppointment : 'api/patient-service/appointment/{$0}',
  deleteAppointment : 'api/patient-service/appointment/{$0}/CANCELLED',
  appointmentById : 'api/patient-service/appointment/{$0}',
  /** Visit Calls */
  createVisit : 'api/patient-service/healthcare/visit/createvisit/',
  getVisitById : 'api/patient-service/healthcare/visit/myvisit/{$0}',
  /** Diagnosis Calls */
  listOfDiagnosis : 'api/diagnosis-service/healthcare/diagnosis/getalldiagnosis',
  diagnosisById : 'api/diagnosis-service/healthcare/diagnosis/{$0}',
  createDiagnosis : 'api/diagnosis-service/healthcare/diagnosis/diagnosisDetailDesc',
  /** Procedure Calls */
  listOfProcedures : 'api/procedure-service/healthcare/procedure/getallProcedure',
  procedureById : 'api/procedure-service/healthcare/procedure/{$0}',
  createProcedure : 'api/procedure-service/healthcare/procedure/procedureDetailDesc',
  /** Medication Calls */
  listOfMedications : 'api/medication-service/medication/getList',
  medicationById : 'api/medication-service/medication/getList/{$0}/{$1}',
  createMedication : 'api/medication-service/medication/saveList',
  /** Patient Calls */
  addPatient : 'api/patient-service/healthcare/patient/',
  patientById : 'api/patient-service/healthcare/patient/{$0}',
  getAllPatients : 'api/patient-service/healthcare/patient/',
  updatePatient : 'api/patient-service/healthcare/patient/',
  listOfAllergies : 'api/patient-service/healthcare/allergies/',
  listOfLanguages : 'api/patient-service/healthcare/languages',
  /** Registration Calls */
  userRegistration : 'api/admin-service/registration/',
  login : 'oauth/token',
  getUserById : 'api/admin-service/registration/{$0}',
  getUserByRole : 'api/admin-service/registration/role/{$0}',
  forgotPassword: 'api/admin-service/authentication/forgotpassword?email={$0}',
  updatePatientDetailCall: 'api/admin-service/registration/afterfirstauth?isPasswordChangeReq={$0}&isPersonalDeatilRequired={$1}&userId={$2}',
  changePassword : 'api/admin-service/authentication/updatepassword',
  /** Inbox Calls */
  sendMail : 'api/producer-service/inboxProducer/sendRequest',
  getMail : 'api/consumer-service/records/get',
  /** Vital Calls */
  addVitals : 'api/vitals-service/healthcare/vitalDetails/addVitalDetails',
  getVitalsById : 'api/vitals-service/healthcare/vitalDetails/getVitalDetailById/{$0}'
}

export class ApiConstants{

  public static generateDynamicEndpoint(url : string, apiEndpointName : string, ...args){
    const endPoint = apiConstant[apiEndpointName]
    .replace('{$0}', args[0])
    .replace('{$1}',args[1])
    .replace('{$2}',args[2]);

    return apiConstant['globalEndpoint'] + endPoint;
  }
}