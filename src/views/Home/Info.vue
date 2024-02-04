<script setup lang="ts">
  import { explanations } from '@/API/phishStats';
</script>

<template>
  <v-card style="max-width: 900px; margin: 0 auto; padding: 16px">
    <p>
      Here is an interface built on top of the
      <strong>Phishstats API</strong> (<a href="https://phishstats.info"
        >https://phishstats.info</a
      >).
      <br />
      This application allows you to search the Phishstats phishing incidents
      database. Here, you can enter, for example, the IP or URL of a resource
      and retrieve information about it, such as:
    </p>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            <strong> Field name </strong>
          </th>
          <th class="text-left">
            <strong> Explanation </strong>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in explanations"
          :key="item[0]"
        >
          <td>
            <strong>
              {{ item[0] }}
            </strong>
          </td>
          <td>{{ item[1] }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
