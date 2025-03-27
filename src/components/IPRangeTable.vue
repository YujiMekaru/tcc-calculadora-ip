<template>
    <v-card>
      <v-card-title>Resultado</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="departmentRanges"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.range="{ item }">
            {{ item.start }} - {{ item.end }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { DepartmentService } from '../services/department/department.service';
  export default {
    data() {
      return {
        departmentService: new DepartmentService(),
        headers: [
          { title: 'Departamento', value: 'department' },
          { title: 'Faixa de IP', value: 'range' },
        ],
        departments: [],
        departmentRanges: [
          // Example data
          { department: 'HR', start: '193.186.4.1', end: '193.186.4.30' },
          { department: 'IT', start: '193.186.4.31', end: '193.186.4.60' },
          { department: 'Finance', start: '193.186.4.61', end: '193.186.4.90' },
        ],
      };
    },
    created() {
    },
  };
  </script>