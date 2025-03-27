import { Department } from "../../department/models/department.model";

export interface Ipv4Subnet {
    id: number;
    department: Department
    mask: string;
    startRange: Ipv4Address;
    endRange: Ipv4Address;
}

export interface Ipv4Address {
    octet1: string;
    octet2: string;
    octet3: string;
    octet4: string;
}