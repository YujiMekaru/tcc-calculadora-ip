<template>
    <v-container>
      <v-card>
        <v-card-title>Calculadora IPv4</v-card-title>
        <v-card-text>
          <!-- IP Input Form -->
          <IPInputForm @calculate="handleCalculate" />
  
          <!-- Department IP Range Table -->
          <DepartmentIPRangeTable v-if="showTable" />
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import IPInputForm from '../components/IPInputForm.vue';
  import DepartmentIPRangeTable from '../components/IPRangeTable.vue';
  
  export default {
    components: {
      IPInputForm,
      DepartmentIPRangeTable,
    },
    data() {
      return {
        showTable: false,
      };
    },
    methods: {
      handleCalculate(ipAddress) {
        // Here you can add the logic to calculate subnets based on the IP address
        console.log('Calculating subnets for:', ipAddress);
  
        // For now, just show the table
        this.showTable = true;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>