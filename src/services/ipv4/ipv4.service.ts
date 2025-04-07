import { DepartmentService } from "../department/department.service";
import { Department } from "../department/models/department.model";
import { Ipv4Subnet, Ipv4Address } from "./models/ipv4-subnet.model";

export class Ipv4Service {
    departmentService: DepartmentService;
    departments: Department[];

    constructor() {
        this.departmentService = new DepartmentService();
        this.departments = this.departmentService.getDepartmentsFromLocalStorage();
    }

    calculateSubnets(): Ipv4Subnet[]
    {
        const result: Ipv4Subnet[] = [];
        this.departments.sort((a, b) => b.hostQty - a.hostQty);
        console.log(this.departments);
        let classCIndex = 0;
        let classBIndex = 16;
        this.departments.map((department) => {
            if (department.hostQty <= 254)
            {
                // utilizar /24, começando de 192.168.0.0/24
                const startRange: Ipv4Address = {
                    octet1: '192',
                    octet2: '168',
                    octet3: classCIndex.toString(),
                    octet4: '1',
                };

                const endRange: Ipv4Address = {
                    octet1: '192',
                    octet2: '168',
                    octet3: classCIndex.toString(),
                    // octet4: (department.hostQty).toString(),
                    octet4: '254'
                };

                const toAdd: Ipv4Subnet = {
                    department: department,
                    id: department.id,
                    mask: '/24',
                    startRange: startRange,
                    endRange: endRange,
                };

                result.push(toAdd);
                classCIndex++;
            }
            else
            {
                // utilizar /16, começando de 172.16.0.0/16
                // implementacao com capacidade de redes com ate 65.024 hosts.
                const startRange: Ipv4Address = {
                    octet1: '172',
                    octet2: classBIndex.toString(),
                    octet3: '0',
                    octet4: '1',
                };

                console.log((department.hostQty / 254).toFixed(0));

                const endRange: Ipv4Address = {
                    octet1: '172',
                    octet2: classBIndex.toString(),
                    // octet3: (department.hostQty / 254).toFixed(0),
                    // octet4: (department.hostQty % 254).toString(),
                    octet3: '255',
                    octet4: '255',
                };

                const toAdd: Ipv4Subnet = {
                    department: department,
                    id: department.id,
                    mask: '/16',
                    startRange: startRange,
                    endRange: endRange,
                };

                result.push(toAdd);
                classBIndex++;
            }
        });
        return result;
    }

}