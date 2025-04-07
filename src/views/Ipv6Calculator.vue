<template>
    <v-container>
      <v-card>
        <v-card-title>Calculadora IPv6</v-card-title>
        <v-card-text>
          <!-- IP Input Form -->
          <IPInputForm @calculate="handleCalculate" />
  
          <!-- Department IP Range Table -->
          <IPv6RangeTable v-if="showTable" :subnets="subnets"/>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import IPInputForm from '../components/IPInputForm.vue';
  import IPv6RangeTable from '../components/IPv6RangeTable.vue';
  import { Ipv6Service } from '../services/ipv6/ipv6.service';
  
  export default {
    components: {
      IPInputForm,
      IPv6RangeTable,
    },
    data() {
      return {
        showTable: false,
      };
    },
    methods: {
      handleCalculate(ipAddress) {
        this.ipv6Service = new Ipv6Service();
        this.subnets = this.ipv6Service.calculateSubnets(ipAddress);
        console.log(this.subnets);
        this.showTable = true;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>