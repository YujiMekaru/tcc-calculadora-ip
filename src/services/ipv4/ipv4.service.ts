import { DepartmentService } from "../department/department.service";
import { Department } from "../department/models/department.model";

export class Ipv4Service {
    departmentService: DepartmentService;
    departments: Department[];

    constructor() {
        this.departmentService = new DepartmentService();
        this.departments = this.departmentService.getDepartmentsFromLocalStorage();
    }

    calculateSubnets()
    {
        console.log('calculate');
        return;
    }

}