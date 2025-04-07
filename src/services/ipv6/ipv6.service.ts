import { DepartmentService } from "../department/department.service";
import { Department } from "../department/models/department.model";
import { Ipv6Subnet, Ipv6Address } from "./models/ipv6-subnet.model";

export class Ipv6Service {
    departmentService: DepartmentService;
    departments: Department[];

    constructor() {
        this.departmentService = new DepartmentService();
        this.departments = this.departmentService.getDepartmentsFromLocalStorage();
    }

    calculateSubnets(sourceIp: string): Ipv6Subnet[]
    {
        // 2001:0db8:85a3:0000::
        // 2001:0db8:85a3:0000:0000:0000:0000:0000

        const ipv6 = this.convertStringToIpv6(sourceIp);

        console.log(ipv6);

        if (ipv6 == null)
            return [];

        const result: Ipv6Subnet[] = [];
        this.departments.sort((a, b) => b.hostQty - a.hostQty);

        let subnetCount = 1;
        this.departments.map((department) => {
            const startRange: Ipv6Address = Object.assign({}, ipv6);
            startRange.group = Object.assign({}, ipv6.group);
            startRange.group[3] = '000' + subnetCount.toString();

            const endRange: Ipv6Address = Object.assign({}, ipv6);
            endRange.group = Object.assign({}, ipv6.group);
            endRange.group[4] = 'ffff';
            endRange.group[5] = 'ffff';
            endRange.group[6] = 'ffff';
            endRange.group[7] = 'ffff';

            const toAdd: Ipv6Subnet = {
                department: department,
                id: department.id,
                mask: '/64',
                startRange: startRange,
                endRange: endRange,
            }

            console.log(toAdd);
            
            result.push(toAdd);
            subnetCount++;
        });
        return result;
    }

    convertStringToIpv6(ip: string): Ipv6Address | null // Regra para validação de Ipv6 utilizada: /48
    {
        let blockCount = 0;
        let aux = ip;
        let hasSpecialNotation = false;

        let ipv6: Ipv6Address = { group: [] };

        if (aux.indexOf('/48') != -1)
            aux = aux.substring(0, aux.indexOf('/48'));

        while (aux.indexOf(':') != -1)
        {
            if (aux.startsWith(':'))
            {
                if (aux.length > 2) // A notação :: só é permitida quando inserida no final do endereço.
                    return null;

                hasSpecialNotation = true;
                break;
            }

            let block = aux.substring(0, aux.indexOf(':'));
            if (block.length > 4)
                return null;

            if (block.length < 4)
            {
                block = block.padStart(4, '0');
            }

            if (blockCount > 3 && block != '0000')
                return null;

            ipv6.group.push(block);
            blockCount++;
            aux = aux.substring(aux.indexOf(':')+1);
        }

        if (!hasSpecialNotation)
        {
            if (blockCount != 7)
                return null;

            if (aux.length > 4)
                return null;

            if (aux.length < 4)
                aux = aux.padStart(4, '0');

            if (aux != '0000')
                return null;

            ipv6.group.push(aux);
            blockCount++;
        }

        if (blockCount > 8)
            return null;

        if (blockCount >= 3 && hasSpecialNotation) // Torna obrigatório pelo menos 3 blocos para identificar a máscara /48
        {
            while (blockCount < 8)
            {
                ipv6.group.push('0000');
                blockCount++;
            }
            return ipv6;
        }

        if (blockCount != 8)
            return null;

        return ipv6;;
    }

}