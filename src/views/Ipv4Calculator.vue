<template>
    <v-container>
      <v-card>
        <v-card-title>Calculadora IPv4</v-card-title>
        <v-card-text>
          <!-- IP Input Form -->
          <!-- <IPInputForm @calculate="handleCalculate" /> -->
  
          <!-- Department IP Range Table -->
          <IPRangeTable v-if="showTable" :subnets="subnets"/>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import IPInputForm from '../components/IPInputForm.vue';
  import IPRangeTable from '../components/IPRangeTable.vue';
  import { Ipv4Service } from '../services/ipv4/ipv4.service';
  
  export default {
    components: {
      IPInputForm,
      IPRangeTable,
    },
    data() {
      return {
        showTable: false,
        ipv4service: new Ipv4Service(),
        subnets: [],
      };
    },
    created() {
      this.handleCalculate();
    },
    methods: {
      handleCalculate() {
        this.ipv4Service = new Ipv4Service();
        this.subnets = this.ipv4Service.calculateSubnets();
        this.showTable = true;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>