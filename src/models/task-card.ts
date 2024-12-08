export interface TaskCard{
    id: string;
    title: string;
    story_type: string;
    priority: string;
    created_date: string;
    name: string;
    title_id: string;
    status: string;
    description: string;
    avatar: string;
    [key: string]: any;
}

export interface UpdateTaskCard{
    id: string;
    title?: string;
    story_type?: string;
    priority?: string;
    created_date?: string;
    name?: string;
    title_id?: string;
    status?: string;
    description?: string;
    avatar?: string; 
    [key: string]: any;
}

export const emptyTaskCard: TaskCard = {
    id: "",
    title: "",
    story_type: "",
    priority: "",
    name: "",
    title_id: "",
    status: "",
    description: "",
    avatar: "",
    created_date: ""
}