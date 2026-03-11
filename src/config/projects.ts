export interface ProjectItem {
    id: number
    name: string
    type: 'folder' | 'dataset'
    parentId: number | null
    createdAt: string
    updatedAt: string
}

export const projectBreadcrumbs = [
    { title: 'Projects', disabled: true }
]

export const projectHeaders = [
    { title: 'Name', key: 'name' },
    { title: 'Last Modified', key: 'modified' }
]

export const mockProjects: ProjectItem[] = [
    {
        "id": 1,
        "name": "Marketing",
        "type": "folder",
        "parentId": null,
        "createdAt": "2026-03-11T14:00:00",
        "updatedAt": "2026-03-11T14:00:00"
    },
    {
        "id": 5,
        "name": "campaign_metrics",
        "type": "dataset",
        "parentId": 1,
        "createdAt": "2026-03-11T14:10:00",
        "updatedAt": "2026-03-11T14:10:00"
    }
]