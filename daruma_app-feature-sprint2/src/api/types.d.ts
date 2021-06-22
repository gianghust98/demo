/* tslint:disable */

/* Date custom scalar type */
export type Date = any;

/* The &#x60;JSON&#x60; scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type JSON = any;


export type Upload = any;

export interface PagingCursor {
  cursors?: CursorReturn[] | null; 
  hasNext?: boolean | null; 
}

export interface PagingOffset {
  maxId?: number | null; 
  next?: number | null; 
  previous?: number | null; 
  pageCount?: number | null; 
}

export interface Query {
  unreadInformationCount?: number | null; 
  informations?: PagingInformation | null; 
  lifelogBloodPressures?: LifelogBloodPressure[] | null; 
  lifelogStepCount?: LifelogStepCount | null; 
  lifelogSleep?: LifelogSleep | null; 
  lifelogMedicineState?: LifelogMedicineState | null; 
  lifelogBodyWeight?: LifelogBodyWeight | null; 
  lifelogSaltConcentration?: LifelogSaltConcentration | null; 
  lifelogStepCounts?: LifelogStepCount[] | null; 
  lifelogSleeps?: LifelogSleep[] | null; 
  lifelogMedicineStates?: LifelogMedicineState[] | null; 
  lifelogBodyWeights?: LifelogBodyWeight[] | null; 
  lifelogSaltConcentrations?: LifelogSaltConcentration[] | null; 
  medicalCertificates?: MedicalCertificate[] | null; 
  sharingMedicalInstitutions?: MedicalInstitution[] | null; 
  pendingSharingMedicalInstitutions?: MedicalInstitution[] | null; 
  currentUser?: RecordUser | null; 
  stampInfo?: StampInfo | null; 
  now: Date; 
}

export interface PagingInformation extends PagingCursor {
  cursors?: CursorReturn[] | null; 
  hasNext?: boolean | null; 
  list?: Information[] | null; 
}

export interface CursorReturn {
  col: string; 
  value?: string | null; 
}

export interface Information {
  id?: number | null; 
  informationMessage?: InformationMessage | null; 
  message?: string | null; 
  readAt?: Date | null; 
  createdAt?: Date | null; 
}

export interface InformationMessage {
  id?: number | null; 
  iconUrl?: string | null; 
  title?: string | null; 
  message?: string | null; 
  linkText?: string | null; 
  linkUrl?: string | null; 
}

export interface LifelogBloodPressure {
  id?: number | null; 
  maximum?: number | null; 
  minimum?: number | null; 
  pulse?: number | null; 
  periodOfTime?: PeriodOfTime | null; 
  recordDevice?: RecordDevice | null; 
  inspectedAt?: Date | null; 
}

export interface LifelogStepCount {
  id?: number | null; 
  stepCount?: number | null; 
  caloriesOut?: number | null; 
  recordDevice?: RecordDevice | null; 
  inspectedAt?: Date | null; 
}

export interface LifelogSleep {
  id?: number | null; 
  sleepTime?: number | null; 
  recordDevice?: RecordDevice | null; 
  inspectedAt?: Date | null; 
}

export interface LifelogMedicineState {
  id?: number | null; 
  drinkStepDownMedicineState?: boolean | null; 
  recordDevice?: RecordDevice | null; 
  inspectedAt?: Date | null; 
}

export interface LifelogBodyWeight {
  id?: number | null; 
  bodyWeight?: number | null; 
  recordDevice?: RecordDevice | null; 
  inspectedAt?: Date | null; 
}

export interface LifelogSaltConcentration {
  id?: number | null; 
  saltConcentration?: number | null; 
  recordDevice?: RecordDevice | null; 
  inspectedAt?: Date | null; 
}

export interface MedicalCertificate {
  id?: number | null; 
  bodyHeight?: number | null; 
  bodyWeight?: number | null; 
  bodyWaist?: number | null; 
  maximum?: number | null; 
  minimum?: number | null; 
  pulse?: number | null; 
  hdlCholesterol?: number | null; 
  ldlCholesterol?: number | null; 
  totalCholesterol?: number | null; 
  neutralFat?: number | null; 
  bloodSugarLevel?: number | null; 
  bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null; 
  hba1c?: number | null; 
  inspectedAt?: Date | null; 
}

export interface MedicalInstitution {
  id?: number | null; 
  setting?: MedicalInstitutionSetting | null; 
}

export interface MedicalInstitutionSetting {
  id?: number | null; 
  name?: string | null; 
}

export interface RecordUser {
  id?: number | null; 
  setting?: RecordUserSetting | null; 
  medalCount?: MedalCount | null; 
  medicalCertificates?: MedicalCertificate[] | null; 
  healthStatus?: HealthStatus | null; 
  fitbitLink?: SyncLink | null; 
  omronLink?: SyncLink | null; 
  baseLine?: BaseLine | null; 
}

export interface RecordUserSetting {
  id?: number | null; 
  sharelingCode?: string | null; 
  postalCode?: string | null; 
  gender?: GenderType | null; 
  birthYear?: number | null; 
  showStepDownMedicineState?: boolean | null; 
  showBodyWeight?: boolean | null; 
  showSaltConcentration?: boolean | null; 
}

export interface MedalCount {
  gold?: number | null; 
  silver?: number | null; 
  bronze?: number | null; 
}

export interface HealthStatus {
  id?: number | null; 
  smokingStatus?: SmokingStatusType | null; 
  diabetesStatus?: boolean | null; 
  cerebrovascularDiseasStatus?: boolean | null; 
  heartLesionStatus?: boolean | null; 
  kidneySiseaseStatus?: boolean | null; 
  vascularLesionStatus?: boolean | null; 
  diseaseDeathRelativesStatus?: boolean | null; 
}

export interface SyncLink {
  linked?: boolean | null; 
  lastSync?: Date | null; 
}

export interface BaseLine {
  maximum?: number | null; 
  minimum?: number | null; 
}

export interface StampInfo {
  weeklyStamps?: StampDay[] | null; 
  nowMedal?: MedalType | null; 
  nextMedal?: MedalType | null; 
  nextMedalRemainStamp?: number | null; 
}

export interface StampDay {
  stampDate?: Date | null; 
  morning?: boolean | null; 
  night?: boolean | null; 
}

export interface Mutation {
  adviceTestPrev?: RecordUser | null; 
  adviceTestThis?: RecordUser | null; 
  firebaseToken?: RecordUser | null; 
  fitbitToken?: RecordUser | null; 
  fitbitUnlink?: RecordUser | null; 
  syncFitbit?: RecordUser | null; 
  healthStatus?: HealthStatus | null; 
  readInformation?: Information | null; 
  addLifelogBloodPressure?: LifelogBloodPressure | null; 
  editLifelogBloodPressure?: LifelogBloodPressure | null; 
  deleteLifelogBloodPressure?: LifelogBloodPressure | null; 
  lifelogMedicineState?: LifelogMedicineState | null; 
  lifelogSaltConcentration?: LifelogSaltConcentration | null; 
  addMedicalCertificate?: MedicalCertificate | null; 
  editMedicalCertificate?: MedicalCertificate | null; 
  deleteMedicalCertificate?: MedicalCertificate | null; 
  omronToken?: RecordUser | null; 
  omronUnlink?: RecordUser | null; 
  syncOmron?: RecordUser | null; 
  profile?: RecordUser | null; 
  sharingMedicalInstitutionAccept?: MedicalInstitution | null; 
  sharingMedicalInstitutionCancel?: MedicalInstitution | null; 
  sharingMedicalInstitutionRemove?: MedicalInstitution | null; 
  setting?: RecordUserSetting | null; 
  lineRegister?: Token | null; 
  lineLogin?: Token | null; 
  deleteUser?: RecordUser | null; 
}

export interface Token {
  accessToken: string; 
  user: RecordUser; 
  now: Date; 
}

export interface VerifyEmail {
  email?: string | null; 
}

export interface CursorInput {
  col: string; 
  value?: string | null; 
}
export interface InformationsQueryArgs {
  cursors?: CursorInput[] | null; 
}
export interface LifelogBloodPressuresQueryArgs {
  year: number; 
  month: number; 
  day?: number | null; 
}
export interface LifelogStepCountQueryArgs {
  year: number; 
  month: number; 
  day: number; 
}
export interface LifelogSleepQueryArgs {
  year: number; 
  month: number; 
  day: number; 
}
export interface LifelogMedicineStateQueryArgs {
  year: number; 
  month: number; 
  day: number; 
}
export interface LifelogBodyWeightQueryArgs {
  year: number; 
  month: number; 
  day: number; 
}
export interface LifelogSaltConcentrationQueryArgs {
  year: number; 
  month: number; 
  day: number; 
}
export interface LifelogStepCountsQueryArgs {
  year: number; 
  month: number; 
}
export interface LifelogSleepsQueryArgs {
  year: number; 
  month: number; 
}
export interface LifelogMedicineStatesQueryArgs {
  year: number; 
  month: number; 
}
export interface LifelogBodyWeightsQueryArgs {
  year: number; 
  month: number; 
}
export interface LifelogSaltConcentrationsQueryArgs {
  year: number; 
  month: number; 
}
export interface MedicalCertificatesQueryArgs {
  year?: number | null; 
  month?: number | null; 
  day?: number | null; 
}
export interface FirebaseTokenMutationArgs {
  firebaseToken: string; 
}
export interface FitbitTokenMutationArgs {
  fitbitAuth: string; 
}
export interface SyncFitbitMutationArgs {
  syncData: Date; 
}
export interface HealthStatusMutationArgs {
  smokingStatus?: SmokingStatusType | null; 
  diabetesStatus?: boolean | null; 
  cerebrovascularDiseasStatus?: boolean | null; 
  heartLesionStatus?: boolean | null; 
  kidneySiseaseStatus?: boolean | null; 
  vascularLesionStatus?: boolean | null; 
  diseaseDeathRelativesStatus?: boolean | null; 
}
export interface ReadInformationMutationArgs {
  informationId: number; 
}
export interface AddLifelogBloodPressureMutationArgs {
  inspectedAt: Date; 
  maximum?: number | null; 
  minimum?: number | null; 
  pulse?: number | null; 
}
export interface EditLifelogBloodPressureMutationArgs {
  id: number; 
  inspectedAt?: Date | null; 
  maximum?: number | null; 
  minimum?: number | null; 
  pulse?: number | null; 
}
export interface DeleteLifelogBloodPressureMutationArgs {
  id: number; 
}
export interface LifelogMedicineStateMutationArgs {
  inspectedAt: Date; 
  drinkStepDownMedicineState: boolean; 
}
export interface LifelogSaltConcentrationMutationArgs {
  inspectedAt: Date; 
  saltConcentration: number; 
}
export interface AddMedicalCertificateMutationArgs {
  bodyHeight?: number | null; 
  bodyWeight?: number | null; 
  bodyWaist?: number | null; 
  maximum?: number | null; 
  minimum?: number | null; 
  pulse?: number | null; 
  hdlCholesterol?: number | null; 
  ldlCholesterol?: number | null; 
  totalCholesterol?: number | null; 
  neutralFat?: number | null; 
  bloodSugarLevel?: number | null; 
  bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null; 
  hba1c?: number | null; 
  inspectedAt?: Date | null; 
}
export interface EditMedicalCertificateMutationArgs {
  id: number; 
  bodyHeight?: number | null; 
  bodyWeight?: number | null; 
  bodyWaist?: number | null; 
  maximum?: number | null; 
  minimum?: number | null; 
  pulse?: number | null; 
  hdlCholesterol?: number | null; 
  ldlCholesterol?: number | null; 
  totalCholesterol?: number | null; 
  neutralFat?: number | null; 
  bloodSugarLevel?: number | null; 
  bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null; 
  hba1c?: number | null; 
  inspectedAt?: Date | null; 
}
export interface DeleteMedicalCertificateMutationArgs {
  id: number; 
}
export interface OmronTokenMutationArgs {
  omronAuth: string; 
}
export interface SyncOmronMutationArgs {
  syncData: Date; 
}
export interface ProfileMutationArgs {
  postalCode?: string | null; 
  gender?: GenderType | null; 
  birthYear?: number | null; 
  showStepDownMedicineState?: boolean | null; 
  showBodyWeight?: boolean | null; 
  showSaltConcentration?: boolean | null; 
  smokingStatus?: SmokingStatusType | null; 
  diabetesStatus?: boolean | null; 
  cerebrovascularDiseasStatus?: boolean | null; 
  heartLesionStatus?: boolean | null; 
  kidneySiseaseStatus?: boolean | null; 
  vascularLesionStatus?: boolean | null; 
  diseaseDeathRelativesStatus?: boolean | null; 
}
export interface SharingMedicalInstitutionAcceptMutationArgs {
  medicalInstitutionUserId: number; 
}
export interface SharingMedicalInstitutionCancelMutationArgs {
  medicalInstitutionUserId: number; 
}
export interface SharingMedicalInstitutionRemoveMutationArgs {
  medicalInstitutionUserId: number; 
}
export interface SettingMutationArgs {
  postalCode?: string | null; 
  gender?: GenderType | null; 
  birthYear?: number | null; 
  showStepDownMedicineState?: boolean | null; 
  showBodyWeight?: boolean | null; 
  showSaltConcentration?: boolean | null; 
}
export interface LineRegisterMutationArgs {
  lineAuth: string; 
}
export interface LineLoginMutationArgs {
  lineAuth: string; 
}

export enum PeriodOfTime {
  morning = "morning",
  night = "night",
  other = "other",
}


export enum RecordDevice {
  application = "application",
  clova = "clova",
  omron = "omron",
  fitbit = "fitbit",
}


export enum BloodSugarLevelMeasureStateType {
  hunger = "hunger",
  other = "other",
}


export enum GenderType {
  man = "man",
  woman = "woman",
}


export enum SmokingStatusType {
  yes = "yes",
  no = "no",
  past = "past",
}


export enum MedalType {
  gold = "gold",
  silver = "silver",
  bronze = "bronze",
}

export namespace MutationAddLifelogBloodPressure {
  export type Variables = {
    inspectedAt: Date;
    maximum?: number | null;
    minimum?: number | null;
    pulse?: number | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    addLifelogBloodPressure?: AddLifelogBloodPressure | null; 
  }

  export type AddLifelogBloodPressure = {
    __typename?: "LifelogBloodPressure";
    id?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    periodOfTime?: PeriodOfTime | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationAddMedicalCertificate {
  export type Variables = {
    bodyHeight?: number | null;
    bodyWeight?: number | null;
    bodyWaist?: number | null;
    maximum?: number | null;
    minimum?: number | null;
    pulse?: number | null;
    hdlCholesterol?: number | null;
    ldlCholesterol?: number | null;
    totalCholesterol?: number | null;
    neutralFat?: number | null;
    bloodSugarLevel?: number | null;
    bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null;
    hba1c?: number | null;
    inspectedAt?: Date | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    addMedicalCertificate?: AddMedicalCertificate | null; 
  }

  export type AddMedicalCertificate = {
    __typename?: "MedicalCertificate";
    id?: number | null; 
    bodyHeight?: number | null; 
    bodyWeight?: number | null; 
    bodyWaist?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    hdlCholesterol?: number | null; 
    ldlCholesterol?: number | null; 
    totalCholesterol?: number | null; 
    neutralFat?: number | null; 
    bloodSugarLevel?: number | null; 
    bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null; 
    hba1c?: number | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationAdviceTestPrev {
  export type Variables = {
  }

  export type Mutation = {
    __typename?: "Mutation";
    adviceTestPrev?: AdviceTestPrev | null; 
  }

  export type AdviceTestPrev = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace MutationAdviceTestThis {
  export type Variables = {
  }

  export type Mutation = {
    __typename?: "Mutation";
    adviceTestThis?: AdviceTestThis | null; 
  }

  export type AdviceTestThis = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace MutationDeleteLifelogBloodPressure {
  export type Variables = {
    id: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    deleteLifelogBloodPressure?: DeleteLifelogBloodPressure | null; 
  }

  export type DeleteLifelogBloodPressure = {
    __typename?: "LifelogBloodPressure";
    id?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationDeleteMedicalCertificate {
  export type Variables = {
    id: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    deleteMedicalCertificate?: DeleteMedicalCertificate | null; 
  }

  export type DeleteMedicalCertificate = {
    __typename?: "MedicalCertificate";
    id?: number | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationDeleteUser {
  export type Variables = {
  }

  export type Mutation = {
    __typename?: "Mutation";
    deleteUser?: DeleteUser | null; 
  }

  export type DeleteUser = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace MutationEditLifelogBloodPressure {
  export type Variables = {
    id: number;
    inspectedAt?: Date | null;
    maximum?: number | null;
    minimum?: number | null;
    pulse?: number | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    editLifelogBloodPressure?: EditLifelogBloodPressure | null; 
  }

  export type EditLifelogBloodPressure = {
    __typename?: "LifelogBloodPressure";
    id?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    periodOfTime?: PeriodOfTime | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationEditMedicalCertificate {
  export type Variables = {
    id: number;
    bodyHeight?: number | null;
    bodyWeight?: number | null;
    bodyWaist?: number | null;
    maximum?: number | null;
    minimum?: number | null;
    pulse?: number | null;
    hdlCholesterol?: number | null;
    ldlCholesterol?: number | null;
    totalCholesterol?: number | null;
    neutralFat?: number | null;
    bloodSugarLevel?: number | null;
    bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null;
    hba1c?: number | null;
    inspectedAt?: Date | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    editMedicalCertificate?: EditMedicalCertificate | null; 
  }

  export type EditMedicalCertificate = {
    __typename?: "MedicalCertificate";
    id?: number | null; 
    bodyHeight?: number | null; 
    bodyWeight?: number | null; 
    bodyWaist?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    hdlCholesterol?: number | null; 
    ldlCholesterol?: number | null; 
    totalCholesterol?: number | null; 
    neutralFat?: number | null; 
    bloodSugarLevel?: number | null; 
    bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null; 
    hba1c?: number | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationFirebaseToken {
  export type Variables = {
    firebaseToken: string;
  }

  export type Mutation = {
    __typename?: "Mutation";
    firebaseToken?: FirebaseToken | null; 
  }

  export type FirebaseToken = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace MutationFitbitToken {
  export type Variables = {
    fitbitAuth: string;
  }

  export type Mutation = {
    __typename?: "Mutation";
    fitbitToken?: FitbitToken | null; 
  }

  export type FitbitToken = {
    __typename?: "RecordUser";
    id?: number | null; 
    fitbitLink?: FitbitLink | null; 
  }

  export type FitbitLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }
}
export namespace MutationFitbitUnlink {
  export type Variables = {
  }

  export type Mutation = {
    __typename?: "Mutation";
    fitbitUnlink?: FitbitUnlink | null; 
  }

  export type FitbitUnlink = {
    __typename?: "RecordUser";
    id?: number | null; 
    fitbitLink?: FitbitLink | null; 
  }

  export type FitbitLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }
}
export namespace MutationHealthStatus {
  export type Variables = {
    smokingStatus?: SmokingStatusType | null;
    diabetesStatus?: boolean | null;
    cerebrovascularDiseasStatus?: boolean | null;
    heartLesionStatus?: boolean | null;
    kidneySiseaseStatus?: boolean | null;
    vascularLesionStatus?: boolean | null;
    diseaseDeathRelativesStatus?: boolean | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    healthStatus?: HealthStatus | null; 
  }

  export type HealthStatus = {
    __typename?: "HealthStatus";
    id?: number | null; 
    smokingStatus?: SmokingStatusType | null; 
    diabetesStatus?: boolean | null; 
    cerebrovascularDiseasStatus?: boolean | null; 
    heartLesionStatus?: boolean | null; 
    kidneySiseaseStatus?: boolean | null; 
    vascularLesionStatus?: boolean | null; 
    diseaseDeathRelativesStatus?: boolean | null; 
  }
}
export namespace MutationLifelog {
  export type Variables = {
    inspectedAt: Date;
    stepCount?: number | null;
    sleepTime?: number | null;
    drinkStepDownMedicineState?: boolean | null;
    bodyWeight?: number | null;
    saltConcentration?: number | null;
  }

  export type Mutation =
}
export namespace MutationLifelogMedicineState {
  export type Variables = {
    inspectedAt: Date;
    drinkStepDownMedicineState: boolean;
  }

  export type Mutation = {
    __typename?: "Mutation";
    lifelogMedicineState?: LifelogMedicineState | null; 
  }

  export type LifelogMedicineState = {
    __typename?: "LifelogMedicineState";
    id?: number | null; 
    drinkStepDownMedicineState?: boolean | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace MutationLifelogSaltConcentration {
  export type Variables = {
    inspectedAt: Date;
    saltConcentration: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    lifelogSaltConcentration?: LifelogSaltConcentration | null; 
  }

  export type LifelogSaltConcentration = {
    __typename?: "LifelogSaltConcentration";
    id?: number | null; 
    saltConcentration?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace LineLogin {
  export type Variables = {
    lineAuth: string;
  }

  export type Mutation = {
    __typename?: "Mutation";
    lineLogin?: LineLogin | null; 
  }

  export type LineLogin = {
    __typename?: "Token";
    accessToken: string; 
    user: User; 
    now: Date; 
  }

  export type User = {
    __typename?: "RecordUser";
    id?: number | null; 
    medicalCertificates?: MedicalCertificates[] | null; 
  }

  export type MedicalCertificates = {
    __typename?: "MedicalCertificate";
    id?: number | null; 
  }
}
export namespace LineRegister {
  export type Variables = {
    lineAuth: string;
  }

  export type Mutation = {
    __typename?: "Mutation";
    lineRegister?: LineRegister | null; 
  }

  export type LineRegister = {
    __typename?: "Token";
    accessToken: string; 
    user: User; 
    now: Date; 
  }

  export type User = {
    __typename?: "RecordUser";
    id?: number | null; 
    medicalCertificates?: MedicalCertificates[] | null; 
  }

  export type MedicalCertificates = {
    __typename?: "MedicalCertificate";
    id?: number | null; 
  }
}
export namespace MutationOmronToken {
  export type Variables = {
    omronAuth: string;
  }

  export type Mutation = {
    __typename?: "Mutation";
    omronToken?: OmronToken | null; 
  }

  export type OmronToken = {
    __typename?: "RecordUser";
    id?: number | null; 
    omronLink?: OmronLink | null; 
  }

  export type OmronLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }
}
export namespace MutationOmronUnlink {
  export type Variables = {
  }

  export type Mutation = {
    __typename?: "Mutation";
    omronUnlink?: OmronUnlink | null; 
  }

  export type OmronUnlink = {
    __typename?: "RecordUser";
    id?: number | null; 
    omronLink?: OmronLink | null; 
  }

  export type OmronLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }
}
export namespace MutationProfile {
  export type Variables = {
    postalCode?: string | null;
    gender?: GenderType | null;
    birthYear?: number | null;
    showStepDownMedicineState?: boolean | null;
    smokingStatus?: SmokingStatusType | null;
    diabetesStatus?: boolean | null;
    cerebrovascularDiseasStatus?: boolean | null;
    heartLesionStatus?: boolean | null;
    kidneySiseaseStatus?: boolean | null;
    vascularLesionStatus?: boolean | null;
    diseaseDeathRelativesStatus?: boolean | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    profile?: Profile | null; 
  }

  export type Profile = {
    __typename?: "RecordUser";
    id?: number | null; 
    setting?: Setting | null; 
    healthStatus?: HealthStatus | null; 
  }

  export type Setting = {
    __typename?: "RecordUserSetting";
    id?: number | null; 
    gender?: GenderType | null; 
    birthYear?: number | null; 
    postalCode?: string | null; 
    gender?: GenderType | null; 
    birthYear?: number | null; 
    showStepDownMedicineState?: boolean | null; 
  }

  export type HealthStatus = {
    __typename?: "HealthStatus";
    id?: number | null; 
    smokingStatus?: SmokingStatusType | null; 
    diabetesStatus?: boolean | null; 
    cerebrovascularDiseasStatus?: boolean | null; 
    heartLesionStatus?: boolean | null; 
    kidneySiseaseStatus?: boolean | null; 
    vascularLesionStatus?: boolean | null; 
    diseaseDeathRelativesStatus?: boolean | null; 
  }
}
export namespace MutationReadInformation {
  export type Variables = {
    informationId: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    readInformation?: ReadInformation | null; 
  }

  export type ReadInformation = {
    __typename?: "Information";
    id?: number | null; 
    readAt?: Date | null; 
  }
}
export namespace MutationSetting {
  export type Variables = {
    showStepDownMedicineState?: boolean | null;
    showBodyWeight?: boolean | null;
    showSaltConcentration?: boolean | null;
  }

  export type Mutation = {
    __typename?: "Mutation";
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "RecordUserSetting";
    id?: number | null; 
    showStepDownMedicineState?: boolean | null; 
    showBodyWeight?: boolean | null; 
    showSaltConcentration?: boolean | null; 
  }
}
export namespace MutationSharingMedicalInstitutionAccept {
  export type Variables = {
    medicalInstitutionUserId: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    sharingMedicalInstitutionAccept?: SharingMedicalInstitutionAccept | null; 
  }

  export type SharingMedicalInstitutionAccept = {
    __typename?: "MedicalInstitution";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "MedicalInstitutionSetting";
    id?: number | null; 
    name?: string | null; 
  }
}
export namespace MutationSharingMedicalInstitutionCancel {
  export type Variables = {
    medicalInstitutionUserId: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    sharingMedicalInstitutionCancel?: SharingMedicalInstitutionCancel | null; 
  }

  export type SharingMedicalInstitutionCancel = {
    __typename?: "MedicalInstitution";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "MedicalInstitutionSetting";
    id?: number | null; 
    name?: string | null; 
  }
}
export namespace MutationSharingMedicalInstitutionRemove {
  export type Variables = {
    medicalInstitutionUserId: number;
  }

  export type Mutation = {
    __typename?: "Mutation";
    sharingMedicalInstitutionRemove?: SharingMedicalInstitutionRemove | null; 
  }

  export type SharingMedicalInstitutionRemove = {
    __typename?: "MedicalInstitution";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "MedicalInstitutionSetting";
    id?: number | null; 
    name?: string | null; 
  }
}
export namespace MutationSyncFitbit {
  export type Variables = {
    syncData: Date;
  }

  export type Mutation = {
    __typename?: "Mutation";
    syncFitbit?: SyncFitbit | null; 
  }

  export type SyncFitbit = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace MutationSyncOmron {
  export type Variables = {
    syncData: Date;
  }

  export type Mutation = {
    __typename?: "Mutation";
    syncOmron?: SyncOmron | null; 
  }

  export type SyncOmron = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace QueryBloodPressureLogs {
  export type Variables = {
    year?: number | null;
    month?: number | null;
    day?: number | null;
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    baseLine?: BaseLine | null; 
  }

  export type BaseLine = {
    __typename?: "BaseLine";
    maximum?: number | null; 
    minimum?: number | null; 
  }
}
export namespace CurrentUser {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
  }
}
export namespace QueryProfile {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    healthStatus?: HealthStatus | null; 
  }

  export type HealthStatus = {
    __typename?: "HealthStatus";
    id?: number | null; 
    smokingStatus?: SmokingStatusType | null; 
    diabetesStatus?: boolean | null; 
    cerebrovascularDiseasStatus?: boolean | null; 
    heartLesionStatus?: boolean | null; 
    kidneySiseaseStatus?: boolean | null; 
    vascularLesionStatus?: boolean | null; 
    diseaseDeathRelativesStatus?: boolean | null; 
  }
}
export namespace QueryHome {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
    unreadInformationCount?: number | null; 
    now: Date; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "RecordUserSetting";
    id?: number | null; 
    sharelingCode?: string | null; 
    gender?: GenderType | null; 
    postalCode?: string | null; 
    birthYear?: number | null; 
    showBodyWeight?: boolean | null; 
    showSaltConcentration?: boolean | null; 
    showStepDownMedicineState?: boolean | null; 
  }
}
export namespace QueryHomeLog {
  export type Variables = {
    year: number;
    month: number;
    day: number;
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
    lifelogBloodPressures?: LifelogBloodPressures[] | null; 
    lifelogStepCount?: LifelogStepCount | null; 
    lifelogSleep?: LifelogSleep | null; 
    lifelogMedicineState?: LifelogMedicineState | null; 
    lifelogBodyWeight?: LifelogBodyWeight | null; 
    lifelogSaltConcentration?: LifelogSaltConcentration | null; 
    stampInfo?: StampInfo | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    medalCount?: MedalCount | null; 
    fitbitLink?: FitbitLink | null; 
    omronLink?: OmronLink | null; 
  }

  export type MedalCount = {
    __typename?: "MedalCount";
    gold?: number | null; 
    silver?: number | null; 
    bronze?: number | null; 
  }

  export type FitbitLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }

  export type OmronLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }

  export type LifelogBloodPressures = {
    __typename?: "LifelogBloodPressure";
    id?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    periodOfTime?: PeriodOfTime | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type LifelogStepCount = {
    __typename?: "LifelogStepCount";
    id?: number | null; 
    stepCount?: number | null; 
    caloriesOut?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type LifelogSleep = {
    __typename?: "LifelogSleep";
    id?: number | null; 
    sleepTime?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type LifelogMedicineState = {
    __typename?: "LifelogMedicineState";
    id?: number | null; 
    drinkStepDownMedicineState?: boolean | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type LifelogBodyWeight = {
    __typename?: "LifelogBodyWeight";
    id?: number | null; 
    bodyWeight?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type LifelogSaltConcentration = {
    __typename?: "LifelogSaltConcentration";
    id?: number | null; 
    saltConcentration?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type StampInfo = {
    __typename?: "StampInfo";
    weeklyStamps?: WeeklyStamps[] | null; 
    nowMedal?: MedalType | null; 
    nextMedal?: MedalType | null; 
    nextMedalRemainStamp?: number | null; 
  }

  export type WeeklyStamps = {
    __typename?: "StampDay";
    stampDate?: Date | null; 
    morning?: boolean | null; 
    night?: boolean | null; 
  }
}
export namespace QueryInformations {
  export type Variables = {
    cursors?: CursorInput[] | null;
  }

  export type Query = {
    __typename?: "Query";
    informations?: Informations | null; 
  }

  export type Informations = {
    __typename?: "PagingInformation";
    cursors?: Cursors[] | null; 
    hasNext?: boolean | null; 
    list?: List[] | null; 
  }

  export type Cursors = {
    __typename?: "CursorReturn";
    col: string; 
    value?: string | null; 
  }

  export type List = {
    __typename?: "Information";
    id?: number | null; 
    readAt?: Date | null; 
    message?: string | null; 
    createdAt?: Date | null; 
    informationMessage?: InformationMessage | null; 
  }

  export type InformationMessage = {
    __typename?: "InformationMessage";
    id?: number | null; 
    title?: string | null; 
    iconUrl?: string | null; 
    linkText?: string | null; 
    linkUrl?: string | null; 
  }
}
export namespace QueryLifelogBloodPressures {
  export type Variables = {
    year: number;
    month: number;
    day?: number | null;
  }

  export type Query = {
    __typename?: "Query";
    lifelogBloodPressures?: LifelogBloodPressures[] | null; 
    currentUser?: CurrentUser | null; 
  }

  export type LifelogBloodPressures = {
    __typename?: "LifelogBloodPressure";
    id?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    baseLine?: BaseLine | null; 
  }

  export type BaseLine = {
    __typename?: "BaseLine";
    maximum?: number | null; 
    minimum?: number | null; 
  }
}
export namespace QueryLifelogBodyWeights {
  export type Variables = {
    year: number;
    month: number;
  }

  export type Query = {
    __typename?: "Query";
    lifelogBodyWeights?: LifelogBodyWeights[] | null; 
  }

  export type LifelogBodyWeights = {
    __typename?: "LifelogBodyWeight";
    id?: number | null; 
    bodyWeight?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace QueryLifelogSaltConcentrations {
  export type Variables = {
    year: number;
    month: number;
  }

  export type Query = {
    __typename?: "Query";
    lifelogSaltConcentrations?: LifelogSaltConcentrations[] | null; 
  }

  export type LifelogSaltConcentrations = {
    __typename?: "LifelogSaltConcentration";
    id?: number | null; 
    saltConcentration?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace QueryLifelogSleeps {
  export type Variables = {
    year: number;
    month: number;
  }

  export type Query = {
    __typename?: "Query";
    lifelogSleeps?: LifelogSleeps[] | null; 
  }

  export type LifelogSleeps = {
    __typename?: "LifelogSleep";
    id?: number | null; 
    sleepTime?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace QueryLifelogStepCounts {
  export type Variables = {
    year: number;
    month: number;
  }

  export type Query = {
    __typename?: "Query";
    lifelogStepCounts?: LifelogStepCounts[] | null; 
  }

  export type LifelogStepCounts = {
    __typename?: "LifelogStepCount";
    id?: number | null; 
    stepCount?: number | null; 
    caloriesOut?: number | null; 
    recordDevice?: RecordDevice | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace QueryMedicalCertificates {
  export type Variables = {
    year?: number | null;
    month?: number | null;
    day?: number | null;
  }

  export type Query = {
    __typename?: "Query";
    medicalCertificates?: MedicalCertificates[] | null; 
  }

  export type MedicalCertificates = {
    __typename?: "MedicalCertificate";
    id?: number | null; 
    bodyHeight?: number | null; 
    bodyWeight?: number | null; 
    bodyWaist?: number | null; 
    maximum?: number | null; 
    minimum?: number | null; 
    pulse?: number | null; 
    hdlCholesterol?: number | null; 
    ldlCholesterol?: number | null; 
    totalCholesterol?: number | null; 
    neutralFat?: number | null; 
    bloodSugarLevel?: number | null; 
    bloodSugarLevelMeasureState?: BloodSugarLevelMeasureStateType | null; 
    hba1c?: number | null; 
    inspectedAt?: Date | null; 
  }
}
export namespace QueryPendingSharingMedicalInstitutions {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    pendingSharingMedicalInstitutions?: PendingSharingMedicalInstitutions[] | null; 
  }

  export type PendingSharingMedicalInstitutions = {
    __typename?: "MedicalInstitution";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "MedicalInstitutionSetting";
    id?: number | null; 
    name?: string | null; 
  }
}
export namespace QueryProfile {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    setting?: Setting | null; 
    healthStatus?: HealthStatus | null; 
  }

  export type Setting = {
    __typename?: "RecordUserSetting";
    id?: number | null; 
    gender?: GenderType | null; 
    birthYear?: number | null; 
    postalCode?: string | null; 
    gender?: GenderType | null; 
    birthYear?: number | null; 
    showStepDownMedicineState?: boolean | null; 
  }

  export type HealthStatus = {
    __typename?: "HealthStatus";
    id?: number | null; 
    smokingStatus?: SmokingStatusType | null; 
    diabetesStatus?: boolean | null; 
    cerebrovascularDiseasStatus?: boolean | null; 
    heartLesionStatus?: boolean | null; 
    kidneySiseaseStatus?: boolean | null; 
    vascularLesionStatus?: boolean | null; 
    diseaseDeathRelativesStatus?: boolean | null; 
  }
}
export namespace QueryProfile {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "RecordUserSetting";
    id?: number | null; 
    showStepDownMedicineState?: boolean | null; 
    showBodyWeight?: boolean | null; 
    showSaltConcentration?: boolean | null; 
  }
}
export namespace QuerySharingMedicalInstitutions {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
    sharingMedicalInstitutions?: SharingMedicalInstitutions[] | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    setting?: Setting | null; 
  }

  export type Setting = {
    __typename?: "RecordUserSetting";
    id?: number | null; 
    sharelingCode?: string | null; 
  }

  export type SharingMedicalInstitutions = {
    __typename?: "MedicalInstitution";
    id?: number | null; 
    setting?: _Setting | null; 
  }

  export type _Setting = {
    __typename?: "MedicalInstitutionSetting";
    id?: number | null; 
    name?: string | null; 
  }
}
export namespace QueryWearableDevice {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "RecordUser";
    id?: number | null; 
    fitbitLink?: FitbitLink | null; 
    omronLink?: OmronLink | null; 
  }

  export type FitbitLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }

  export type OmronLink = {
    __typename?: "SyncLink";
    linked?: boolean | null; 
    lastSync?: Date | null; 
  }
}
