import { Department } from "./models/department.model";

export class DepartmentService {
    getDepartmentsFromLocalStorage(): Department[] {
		let repoObj = localStorage.getItem('departments');

        let repo: Department[] = [];

        if (repoObj == null)
            return repo;

        repo = JSON.parse(repoObj);
		return repo;
	};

    addToLocalStorage(department: Department): void {
        const repo = this.getDepartmentsFromLocalStorage();
        repo.push(department);
		localStorage.setItem('departments', JSON.stringify(repo));
	};

    editDepartment(id: Number, department: Department): void {
        let repo = this.getDepartmentsFromLocalStorage();

        const result = repo.find(dep => dep.id == id);
        if (!result)
            return;

        repo = repo.filter(dep => dep.id != result.id);

        repo.push({ ...department });

        localStorage.setItem('departments', JSON.stringify(repo));
    }

    deleteDepartment(id: Number): void {
        let repo = this.getDepartmentsFromLocalStorage();

        const result = repo.find(dep => dep.id == id);
        if (!result)
            return;

        repo = repo.filter(dep => dep.id != result.id);

        localStorage.setItem('departments', JSON.stringify(repo));
    }

    findDepartmentInLocalStorage(id: Number): Department | null {
		let repo = this.getDepartmentsFromLocalStorage();

        const result = repo.find(dep => dep.id == id);
        if (!result)
            return null;

        return result;
	};

    getNextId(): number {
        let idStr = localStorage.getItem('departmentSequence');
        let id: number = 1;
        if (idStr == null)
        {
            localStorage.setItem('departmentSequence', '2');
            return id;
        }

        id = Number.parseInt(idStr);
        localStorage.setItem('departmentSequence', (id+1).toString());
        return id;
    }
}