// Fake API Generator
import type { ProjectItem } from '@/config/projects'

let nextId = 1000

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function apiCreateProject(
    item: Partial<ProjectItem>
): Promise<ProjectItem> {
    
    await delay(300)

    return {
        id: nextId++,
        name: item.name ?? 'Untitled',
        type: item.type ?? 'folder',
        parentId: item.parentId ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}

export async function apiUploadDataset(
    file: File,
    parentId: number | null
): Promise<ProjectItem> {

    await delay(400)

    return {
        id: nextId++,
        name: file.name.replace('.xlsx', ''),
        type: 'dataset',
        parentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}