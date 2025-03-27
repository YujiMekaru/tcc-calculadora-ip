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

          <template v-slot:item.start="{ item }">
            <code>{{ item.start }}</code>
          </template>

          <template v-slot:item.end="{ item }">
            <code>{{ item.end }}</code>
          </template>

        </v-data-table>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { DepartmentService } from '../services/department/department.service';
  export default {
    props: {
      subnets: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        departmentService: new DepartmentService(),
        headers: [
          { title: 'Departamento', value: 'department' },
          { title: 'IP Inicial', value: 'start' },
          { title: 'IP Final', value: 'end' },
        ],
        // departments: [],
        // departmentRanges: [
        //   // Example data
        //   { department: 'HR', start: '193.186.4.1', end: '193.186.4.30' },
        //   { department: 'IT', start: '193.186.4.31', end: '193.186.4.60' },
        //   { department: 'Finance', start: '193.186.4.61', end: '193.186.4.90' },
        // ],
      };
    },
    created() {
    },
    computed: {
      departmentRanges() {
        return this.subnets.map(subnet => ({
          department: subnet.department.name || 'N/A',
          start: `${subnet.startRange.octet1}.${subnet.startRange.octet2}.${subnet.startRange.octet3}.${subnet.startRange.octet4}` || 'N/A',
          end: `${subnet.endRange.octet1}.${subnet.endRange.octet2}.${subnet.endRange.octet3}.${subnet.endRange.octet4}` || 'N/A',
        }));
      }
    }
  };
  </script>