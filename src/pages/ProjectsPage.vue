<script setup lang="ts">
import { ref } from 'vue'

import {
    projectBreadcrumbs,
    projectHeaders,
    mockProjects
} from '@/config/projects'

const search = ref('')
const projects = ref(mockProjects)

function createProject() {
    console.log('Create project')
}
</script>

<template>
    <div>
        <!-- PAGE TITLE -->
         <h1 class="text-h4 font-weight-medium mb-2">
            Projects
         </h1>

         <!-- Breadcrumbs -->
          <v-breadcrumbs 
            :items="projectBreadcrumbs"
            class="mb-6"
          />

          <!-- Toolbar -->
           <v-row>
                <v-col class="mb-4">
                    <v-text-field
                        v-model="search"
                        density="compact"
                        prepend-inner-icon="mdi-magnify"
                        label="Search projects"
                        variant="outlined"
                        hide-details
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    class="text-md-right"
                >
                    <v-btn
                        color="primary"
                        @click="createProject"
                    >
                        + Create New Project
                    </v-btn>
                </v-col>
           </v-row>

           <!-- Projects Table -->
            <v-data-table
                :headers="headers"
                :items="projects"
                :search="search"
                item-value="name"
                hover
            >
                <!-- Folder Icon -->
                 <template #item.name="{ item }">
                    <div class="d-flex align-center">
                        <v-icon class="mr-2">mdi-folder</v-icon>
                        {{ item.name }}
                    </div>
                 </template>
            </v-data-table>
    </div>
</template>