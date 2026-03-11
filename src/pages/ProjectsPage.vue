<script setup lang="ts">
import * as XLSX from 'xlsx'
import { ref, computed } from 'vue'
import {
    projectBreadcrumbs,
    projectHeaders,
    mockProjects,
} from '@/config/projects'
import type { ProjectItem } from '@/config/projects'
import { apiCreateProject, apiUploadDataset } from '@/services/mockApi'

const search = ref('')
const projects = ref(mockProjects)
const fileInput = ref<HTMLInputElement | null>(null)
const currentFolder = ref<number | null>(null)
const visibleItems = computed(() =>
    projects.value.filter(item => item.parentId === currentFolder.value) 
)

function openFileDialog() {
    fileInput.value?.click()
}

function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return
    const reader = new FileReader()

    reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)

        const workbook = XLSX.read(data, { type: 'array' })

        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        const jsonData = XLSX.utils.sheet_to_json(sheet)

        console.log('Dataset: ', jsonData)

        uploadDatasetFile(file)
    }
    reader.readAsArrayBuffer(file)
}
/*
function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return
    const reader = new FileReader()

    reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)

        const workbook = XLSX.read(data, { type: 'array' })

        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        const jsonData = XLSX.utils.sheet_to_json(sheet)

        console.log('Dataset: ', jsonData)

        uploadDataset(file)
    }
    reader.readAsArrayBuffer(file)
}
*/
function createProject() {
    console.log('Create project')
}

function addProject(project: ProjectItem) {
    projects.value.push(project)
}

function openItem(item: ProjectItem) {
    if (item.type === 'folder') {
        currentFolder.value = item.id
    }
}

function goBack() {
    const folder = projects.value.find(p => p.id === currentFolder.value)
    currentFolder.value = folder?.parentId ?? null
}

async function createFolder() {
  const name = prompt('Folder name')
  if (!name) return

  const project = await apiCreateProject({
    name,
    type: 'folder',
    parentId: currentFolder.value
  })

  projects.value.push(project)
}

async function uploadDatasetFile(file: File) {
  const dataset = await apiUploadDataset(file, currentFolder.value)

  projects.value.push(dataset)
}
/*
async function createFolder() {
    const name = prompt('Folder name')
    if (!name) return

    const response = await api.post('/projects', {
        name,
        type: 'folder',
        parentId: currentFolder.value
    })

    projects.value.push(response.data)
}

async function uploadDataset(file: File) {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('parentId', String(currentFolder.value ?? ''))

    const response = await api.post('/datasets/upload', formData)

    projects.value.push(response.data)
}
*/
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
           <v-row class="mb-4" align="center">
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="search"
                        density="compact"
                        prepend-inner-icon="mdi-magnify"
                        label="Search projects"
                        variant="outlined"
                        hide-details
                    />

                    <v-btn
                        v-if="currentFolder"
                        variant="text"
                        @click="goBack"
                        class="mb-4"
                    >
                        ← Back
                    </v-btn>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    class="text-md-right"
                >
                    <input 
                        ref="fileInput"
                        type="file"
                        accept=".xlsx"
                        style="display:none"
                        @change="handleFileUpload"
                    />

                    <v-btn
                        variant="outlined"
                        class="mr-2"
                        @click="createFolder"
                    >
                        New Folder
                    </v-btn>

                    <v-btn 
                        class="mr-2"
                        variant="outlined"
                        @click="openFileDialog"
                    >
                        Import Dataset
                    </v-btn>

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
                :headers="projectHeaders"
                :items="visibleItems"
                :search="search"
                hover
            >
                <!-- Folder Icon -->
                 <template #item.name="{ item }">
                    <div 
                        class="d-flex align-center cursor-pointer"
                        @click="openItem(item)"
                    >
                        <v-icon class="mr-2">
                            {{ item.type === 'folder' ? 'mdi-folder' : 'mdi-file-excel' }}
                        </v-icon>
                        {{ item.name }}
                    </div>
                 </template>
            </v-data-table>
    </div>
</template>