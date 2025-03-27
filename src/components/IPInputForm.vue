<template>
    <v-form @submit.prevent="calculateSubnets">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ipAddress"
            label="Digite o IP"
            placeholder="Ex.: 193.186.4.202"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn type="submit" color="primary">Calcular</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ipAddress: '',
      };
    },
    methods: {
      calculateSubnets() {
        this.$emit('calculate', this.ipAddress);
      },
    },
  };
  </script>