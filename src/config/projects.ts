export interface Project {
    name: string
    modified: string
}

export const projectBreadcrumbs = [
    { title: 'Projects', disabled: true }
]

export const projectHeaders = [
    { title: 'Name', key: 'name' },
    { title: 'Last Modified', key: 'modified' }
]

export const mockProjects: Project[] = [
    { name: 'Marketing Dashboard', modified: '2026-03-09 14:30' },
    { name: 'Client Analytics', modified: '2026-03-08 17:12' },
    { name: 'Financial Reports', modified: '2026-03-06 09:10' }
]