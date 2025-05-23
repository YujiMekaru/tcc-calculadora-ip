import { Department } from "../../department/models/department.model";

export interface Ipv6Subnet {
    id: number;
    department: Department
    mask: string;
    startRange: Ipv6Address;
    endRange: Ipv6Address;
}

export interface Ipv6Address {
    group: string[];
}