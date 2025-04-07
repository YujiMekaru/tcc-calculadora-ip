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
      };
    },
    created() {
    },
    computed: {
      departmentRanges() {
        return this.subnets.map(subnet => ({
          department: subnet.department.name || 'N/A',
          start: `${subnet.startRange.group[0]}.${subnet.startRange.group[1]}.${subnet.startRange.group[2]}.${subnet.startRange.group[3]}.${subnet.startRange.group[4]}.${subnet.startRange.group[5]}.${subnet.startRange.group[6]}.${subnet.startRange.group[7]}` || 'N/A',
          end: `${subnet.endRange.group[0]}.${subnet.endRange.group[1]}.${subnet.endRange.group[2]}.${subnet.endRange.group[3]}.${subnet.endRange.group[4]}.${subnet.endRange.group[5]}.${subnet.endRange.group[6]}.${subnet.endRange.group[7]}` || 'N/A',
        }));
      }
    }
  };
  </script>