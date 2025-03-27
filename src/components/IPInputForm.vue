<template>
    <v-form @submit.prevent="calculateSubnets">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ipAddress"
            label="Digite o IP fornecido pela operadora..."
            placeholder="Ex.: 2001:0db8:85a3:0000::"
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