import AuthService from './auth'
import BookingService from './booking'
import ChatService from './chat'
import DepartmentService from './departments'
import DoctorService from './doctors'
import ParamService from './param'
import PatientService from './patient'
import ReportService from './report'
import SpecializeService from './specializes'
import UploadService from './upload'
import UserService from './users'

export const apiParams: ParamService = new ParamService()
export const apiAuth: AuthService = new AuthService()
export const apiUser: UserService = new UserService()
export const apiDoctor: DoctorService = new DoctorService()
export const apiDepartment: DepartmentService = new DepartmentService()
export const apiSpecialize: SpecializeService = new SpecializeService()
export const apiUpload: UploadService = new UploadService()
export const apiBooking: BookingService = new BookingService()
export const apiPatient: PatientService = new PatientService()
export const apiReport: ReportService = new ReportService()
export const apiChat: ChatService = new ChatService()
