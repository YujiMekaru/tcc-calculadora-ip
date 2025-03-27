<template>
	<v-container>
	  <v-card>
		<v-card-title>Gerenciar Departmentos</v-card-title>
		<v-card-text>
		  <!-- Form to add a new department -->
		  <v-form @submit.prevent="addDepartment">
			<v-row>
			  <v-col cols="12" md="4">
				<v-text-field
				  v-model="newDepartment.name"
				  label="Nome"
				  required
				></v-text-field>
			  </v-col>
			  <v-col cols="12" md="4">
				<v-text-field
				  v-model="newDepartment.hostQty"
				  label="Quantidade de Máquinas"
				  type="number"
				  required
				></v-text-field>
			  </v-col>
			  <v-col cols="12" md="4">
				<v-btn type="submit" color="primary">Adicionar</v-btn>
			  </v-col>
			</v-row>
		  </v-form>
  
		  <!-- List of departments -->
		  <v-list>
			<v-list-item v-for="(department, index) in departments" :key="index">
			  <v-list-item-content>
				<v-list-item-title>{{ department.name }}</v-list-item-title>
				<v-list-item-subtitle>
				  Máquinas: {{ department.hostQty }}
				</v-list-item-subtitle>
			  </v-list-item-content>
			  <v-list-item-action>
				<v-icon small class="mr-2" @click="editDepartment(index)">
				  mdi-pencil
				</v-icon>
				<v-icon small @click="deleteDepartment(index)">
				  mdi-delete
				</v-icon>
			  </v-list-item-action>
			</v-list-item>
		  </v-list>
  
		  <!-- Edit Dialog -->
		  <v-dialog v-model="editDialog" max-width="500px">
			<v-card>
			  <v-card-title>Edit Department</v-card-title>
			  <v-card-text>
				<v-form @submit.prevent="saveEdit">
				  <v-text-field
					v-model="editedDepartment.name"
					label="Nome"
					required
				  ></v-text-field>
				  <v-text-field
					v-model="editedDepartment.hostQty"
					label="Quantidade de Máquinas"
					type="number"
					required
				  ></v-text-field>
				  <v-btn type="submit" color="primary">Salvar</v-btn>
				  <v-btn @click="editDialog = false">Cancelar</v-btn>
				</v-form>
			  </v-card-text>
			</v-card>
		  </v-dialog>
		</v-card-text>
	  </v-card>
	</v-container>
  </template>
  
  <script>
import { DepartmentService } from '../services/department/department.service';
  export default {
	data() {
	  return {
		newDepartment: {
		  id: 0,
		  name: '',
		  hostQty: 0,
		},
		departments: [],
		editDialog: false,
		editedDepartment: {
	      id: 0,
		  name: '',
		  hostQty: 0,
		},
		editedIndex: -1,
		departmentService: new DepartmentService(),
	  };
	},
	created() {
		this.departmentService = new DepartmentService();
		const deps = this.departmentService.getDepartmentsFromLocalStorage();
		if (deps.length == 0)
			return;

		this.departments = deps.map(dep => {
			return { id: dep.id, name: dep.name, hostQty: dep.hostQty };
		})
	},
	methods: {
	  addDepartment() {
		const id = this.departmentService.getNextId();
		this.newDepartment.id = id;
		this.departmentService.addToLocalStorage({ ...this.newDepartment });

		this.departments.push({ ...this.newDepartment });
		this.newDepartment = { id: 0, name: '', hostQty: 0 }; // Reset form
	  },
	  editDepartment(index) {
		this.editedIndex = index;
		this.editedDepartment = { ...this.departments[index] };
		this.editDialog = true;
	  },
	  saveEdit() {
		const dep = { ...this.editedDepartment };
		this.departmentService.editDepartment(this.editedDepartment.id, dep);
		Object.assign(this.departments[this.editedIndex], this.editedDepartment);
		this.editDialog = false;
	  },
	  deleteDepartment(index) {
		const dep = { ...this.departments[index] };
		this.departmentService.deleteDepartment(dep.id);
		this.departments.splice(index, 1);
	  },
	},
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>